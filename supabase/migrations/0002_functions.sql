-- EnglishPath: helper functions, triggers, and security-sensitive RPCs.
-- All mutations that affect XP, streaks, and progress happen inside
-- SECURITY DEFINER functions so that the browser can never write those
-- columns directly. Row Level Security (see 0003_rls.sql) blocks direct
-- table writes to the protected columns/tables and only these functions
-- (executed with the caller's auth.uid(), but elevated table privileges)
-- are able to change them.

-- ============================================================================
-- updated_at helper
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.levels;
create trigger set_updated_at before update on public.levels
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.units;
create trigger set_updated_at before update on public.units
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.lessons;
create trigger set_updated_at before update on public.lessons
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.questions;
create trigger set_updated_at before update on public.questions
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.profiles;
create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.user_lesson_progress;
create trigger set_updated_at before update on public.user_lesson_progress
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Auto-create a profile row whenever a new auth user registers.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_first_level_id uuid;
begin
  select id into v_first_level_id from public.levels order by order_index asc limit 1;

  insert into public.profiles (id, full_name, role, active_level_id)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'user',
    v_first_level_id
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Guard: prevents the browser (or any direct table UPDATE using the user's
-- own RLS-approved session) from tampering with XP / streak / role fields.
-- The bypass flag is only ever set from within this file's SECURITY DEFINER
-- functions, never exposed to client code.
-- ============================================================================
create or replace function public.guard_profile_protected_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(current_setting('app.bypass_profile_guard', true), 'off') = 'on' then
    return new;
  end if;

  new.total_xp := old.total_xp;
  new.current_streak := old.current_streak;
  new.longest_streak := old.longest_streak;
  new.last_activity_date := old.last_activity_date;
  new.role := old.role;
  new.placement_recommended_level_id := old.placement_recommended_level_id;

  return new;
end;
$$;

drop trigger if exists guard_profile_protected_fields on public.profiles;
create trigger guard_profile_protected_fields
  before update on public.profiles
  for each row execute function public.guard_profile_protected_fields();

-- ============================================================================
-- is_admin(): used inside RLS policies. SECURITY DEFINER lets it read
-- profiles.role even though the caller's own RLS SELECT policy would
-- otherwise only let them see their own row (avoids policy recursion).
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================================
-- Level / lesson unlock rules
-- ============================================================================
create or replace function public.is_level_unlocked(p_level_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_user uuid := auth.uid();
  v_order integer;
  v_force boolean;
  v_prev_level_id uuid;
  v_total integer;
  v_completed integer;
  v_avg numeric;
  v_recommended_order integer;
begin
  if v_user is null then
    return false;
  end if;

  select order_index, force_unlocked into v_order, v_force
  from public.levels where id = p_level_id;

  if v_order is null then
    return false;
  end if;

  if v_force or v_order = 0 then
    return true;
  end if;

  select id into v_prev_level_id from public.levels where order_index = v_order - 1;
  if v_prev_level_id is null then
    return true;
  end if;

  select count(*) into v_total
  from public.lessons l join public.units u on u.id = l.unit_id
  where u.level_id = v_prev_level_id and l.is_published;

  select count(*) into v_completed
  from public.user_lesson_progress ulp
  join public.lessons l on l.id = ulp.lesson_id
  join public.units u on u.id = l.unit_id
  where u.level_id = v_prev_level_id and ulp.user_id = v_user and ulp.status = 'completed';

  select avg(qa.score) into v_avg
  from public.quiz_attempts qa
  join public.lessons l on l.id = qa.lesson_id
  join public.units u on u.id = l.unit_id
  where u.level_id = v_prev_level_id and qa.user_id = v_user;

  if v_total > 0 and (v_completed::numeric / v_total) >= 0.8 and coalesce(v_avg, 0) >= 70 then
    return true;
  end if;

  select l2.order_index into v_recommended_order
  from public.profiles p
  join public.levels l2 on l2.id = p.placement_recommended_level_id
  where p.id = v_user;

  if v_recommended_order is not null and v_order <= v_recommended_order then
    return true;
  end if;

  return false;
end;
$$;

create or replace function public.is_lesson_unlocked(p_lesson_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_user uuid := auth.uid();
  v_unit_id uuid;
  v_level_id uuid;
  v_order integer;
  v_force boolean;
  v_prev_lesson_id uuid;
  v_prev_completed boolean;
begin
  if v_user is null then
    return false;
  end if;

  select unit_id, order_index, force_unlocked into v_unit_id, v_order, v_force
  from public.lessons where id = p_lesson_id;

  if v_unit_id is null then
    return false;
  end if;

  if v_force then
    return true;
  end if;

  select id into v_prev_lesson_id
  from public.lessons
  where unit_id = v_unit_id and order_index < v_order
  order by order_index desc
  limit 1;

  if v_prev_lesson_id is null then
    select l2.id into v_prev_lesson_id
    from public.units u1
    join public.units u2 on u2.level_id = u1.level_id and u2.order_index < u1.order_index
    join public.lessons l2 on l2.unit_id = u2.id
    where u1.id = v_unit_id
    order by u2.order_index desc, l2.order_index desc
    limit 1;

    if v_prev_lesson_id is null then
      select level_id into v_level_id from public.units where id = v_unit_id;
      return public.is_level_unlocked(v_level_id);
    end if;
  end if;

  select exists (
    select 1 from public.user_lesson_progress
    where user_id = v_user and lesson_id = v_prev_lesson_id and status = 'completed'
  ) into v_prev_completed;

  return coalesce(v_prev_completed, false);
end;
$$;

-- ============================================================================
-- Achievement evaluation. Called after XP-earning events.
-- ============================================================================
create or replace function public.check_and_award_achievements(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_achievement record;
  v_progress numeric;
begin
  for v_achievement in select * from public.achievements loop
    if exists (
      select 1 from public.user_achievements
      where user_id = p_user_id and achievement_id = v_achievement.id
    ) then
      continue;
    end if;

    v_progress := 0;

    if v_achievement.requirement_type = 'lessons_completed' then
      select count(*) into v_progress from public.user_lesson_progress
      where user_id = p_user_id and status = 'completed';
    elsif v_achievement.requirement_type = 'quiz_perfect' then
      select count(*) into v_progress from public.quiz_attempts
      where user_id = p_user_id and score = 100;
    elsif v_achievement.requirement_type = 'streak_days' then
      select coalesce(longest_streak, 0) into v_progress from public.profiles where id = p_user_id;
    elsif v_achievement.requirement_type = 'vocabulary_completed' then
      select coalesce(sum(vocab_count), 0) into v_progress
      from (
        select l.id, count(v.id) as vocab_count
        from public.user_lesson_progress ulp
        join public.lessons l on l.id = ulp.lesson_id
        left join public.vocabulary v on v.lesson_id = l.id
        where ulp.user_id = p_user_id and ulp.status = 'completed'
        group by l.id
      ) sub;
    elsif v_achievement.requirement_type = 'speaking_attempts' then
      select count(*) into v_progress from public.user_lesson_progress
      where user_id = p_user_id and best_speaking_score is not null;
    end if;

    if v_progress >= v_achievement.requirement_value then
      insert into public.user_achievements (user_id, achievement_id)
      values (p_user_id, v_achievement.id)
      on conflict do nothing;

      perform set_config('app.bypass_profile_guard', 'on', true);
      update public.profiles set total_xp = total_xp + v_achievement.xp_reward where id = p_user_id;
      perform set_config('app.bypass_profile_guard', 'off', true);
    end if;
  end loop;
end;
$$;

-- ============================================================================
-- Streak + daily activity bookkeeping shared by several RPCs.
-- ============================================================================
create or replace function public.bump_daily_activity(
  p_user_id uuid,
  p_minutes integer,
  p_lessons integer,
  p_quizzes integer,
  p_xp integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.daily_activities (user_id, activity_date, minutes_learned, lessons_completed, quizzes_completed, xp_earned)
  values (p_user_id, current_date, p_minutes, p_lessons, p_quizzes, p_xp)
  on conflict (user_id, activity_date) do update set
    minutes_learned = public.daily_activities.minutes_learned + excluded.minutes_learned,
    lessons_completed = public.daily_activities.lessons_completed + excluded.lessons_completed,
    quizzes_completed = public.daily_activities.quizzes_completed + excluded.quizzes_completed,
    xp_earned = public.daily_activities.xp_earned + excluded.xp_earned;
end;
$$;

create or replace function public.update_streak_and_xp(p_user_id uuid, p_xp integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_last_date date;
  v_current_streak integer;
  v_longest_streak integer;
  v_new_streak integer;
begin
  select last_activity_date, current_streak, longest_streak
  into v_last_date, v_current_streak, v_longest_streak
  from public.profiles where id = p_user_id;

  if v_last_date is null or v_last_date < current_date - interval '1 day' then
    v_new_streak := 1;
  elsif v_last_date = current_date - interval '1 day' then
    v_new_streak := coalesce(v_current_streak, 0) + 1;
  else
    v_new_streak := coalesce(v_current_streak, 1);
  end if;

  perform set_config('app.bypass_profile_guard', 'on', true);
  update public.profiles set
    total_xp = total_xp + p_xp,
    current_streak = v_new_streak,
    longest_streak = greatest(coalesce(v_longest_streak, 0), v_new_streak),
    last_activity_date = current_date
  where id = p_user_id;
  perform set_config('app.bypass_profile_guard', 'off', true);
end;
$$;

-- ============================================================================
-- mark_lesson_started: called when a user opens a lesson page.
-- ============================================================================
create or replace function public.mark_lesson_started(p_lesson_id uuid)
returns public.user_lesson_progress
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_row public.user_lesson_progress;
begin
  if v_user is null then
    raise exception 'Anda harus masuk untuk melanjutkan.' using errcode = '28000';
  end if;

  if not exists (select 1 from public.lessons where id = p_lesson_id and is_published) then
    raise exception 'Pelajaran tidak ditemukan.' using errcode = 'P0002';
  end if;

  if not public.is_lesson_unlocked(p_lesson_id) then
    raise exception 'Pelajaran ini masih terkunci.' using errcode = '42501';
  end if;

  insert into public.user_lesson_progress (user_id, lesson_id, status, last_accessed_at)
  values (v_user, p_lesson_id, 'in_progress', now())
  on conflict (user_id, lesson_id) do update set
    last_accessed_at = now(),
    status = case when public.user_lesson_progress.status = 'not_started' then 'in_progress' else public.user_lesson_progress.status end
  returning * into v_row;

  return v_row;
end;
$$;

-- ============================================================================
-- submit_quiz_attempt: the single, secure entry point for grading a quiz.
-- Scoring happens on the server using the stored correct_answer, so the
-- browser can never submit a fabricated score.
-- ============================================================================
create or replace function public.submit_quiz_attempt(p_lesson_id uuid, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_lesson public.lessons;
  v_question record;
  v_submitted text;
  v_is_correct boolean;
  v_total integer := 0;
  v_correct integer := 0;
  v_score integer;
  v_passed boolean;
  v_attempt_id uuid;
  v_xp integer := 0;
  v_was_completed boolean := false;
  v_new_best boolean := false;
  v_progress public.user_lesson_progress;
  v_review jsonb := '[]'::jsonb;
begin
  if v_user is null then
    raise exception 'Anda harus masuk untuk melanjutkan.' using errcode = '28000';
  end if;

  select * into v_lesson from public.lessons where id = p_lesson_id and is_published;
  if v_lesson.id is null then
    raise exception 'Pelajaran tidak ditemukan.' using errcode = 'P0002';
  end if;

  if not public.is_lesson_unlocked(p_lesson_id) then
    raise exception 'Pelajaran ini masih terkunci.' using errcode = '42501';
  end if;

  select status = 'completed' into v_was_completed
  from public.user_lesson_progress where user_id = v_user and lesson_id = p_lesson_id;
  v_was_completed := coalesce(v_was_completed, false);

  for v_question in
    select * from public.questions where lesson_id = p_lesson_id order by order_index asc
  loop
    v_total := v_total + 1;

    select value into v_submitted
    from jsonb_to_recordset(p_answers) as x(question_id uuid, value text)
    where x.question_id = v_question.id
    limit 1;

    v_is_correct := v_submitted is not null
      and lower(trim(v_submitted)) = lower(trim(v_question.correct_answer));

    if v_is_correct then
      v_correct := v_correct + 1;
    end if;

    v_review := v_review || jsonb_build_object(
      'question_id', v_question.id,
      'prompt', v_question.prompt,
      'submitted_answer', coalesce(v_submitted, ''),
      'correct_answer', v_question.correct_answer,
      'is_correct', v_is_correct,
      'explanation', v_question.explanation
    );
  end loop;

  if v_total = 0 then
    raise exception 'Kuis ini belum memiliki soal.' using errcode = 'P0002';
  end if;

  v_score := round((v_correct::numeric / v_total::numeric) * 100);
  v_passed := v_score >= 70;

  insert into public.quiz_attempts (user_id, lesson_id, score, correct_answers, incorrect_answers, total_questions, xp_earned, passed, started_at, completed_at)
  values (v_user, p_lesson_id, v_score, v_correct, v_total - v_correct, v_total, 0, v_passed, now(), now())
  returning id into v_attempt_id;

  insert into public.quiz_answers (attempt_id, question_id, submitted_answer, is_correct, points_earned)
  select v_attempt_id, (elem->>'question_id')::uuid, elem->>'submitted_answer',
         (elem->>'is_correct')::boolean,
         case when (elem->>'is_correct')::boolean then 1 else 0 end
  from jsonb_array_elements(v_review) as elem;

  select (best_quiz_score is null or v_score > best_quiz_score) into v_new_best
  from public.user_lesson_progress where user_id = v_user and lesson_id = p_lesson_id;
  v_new_best := coalesce(v_new_best, true);

  if v_passed and not v_was_completed then
    v_xp := v_xp + 20; -- lesson completion
    v_xp := v_xp + 10; -- quiz completion
    if v_score = 100 then
      v_xp := v_xp + 15;
    end if;
  elsif v_new_best then
    v_xp := v_xp + 10;
    if v_score = 100 then
      v_xp := v_xp + 15;
    end if;
  end if;

  insert into public.user_lesson_progress (user_id, lesson_id, status, completion_percentage, best_quiz_score, attempts_count, completed_at, last_accessed_at)
  values (
    v_user, p_lesson_id,
    case when v_passed then 'completed' else 'in_progress' end,
    case when v_passed then 100 else greatest(50, v_score) end,
    v_score, 1,
    case when v_passed then now() else null end,
    now()
  )
  on conflict (user_id, lesson_id) do update set
    status = case when v_passed then 'completed' else public.user_lesson_progress.status end,
    completion_percentage = case when v_passed then 100 else greatest(public.user_lesson_progress.completion_percentage, v_score) end,
    best_quiz_score = greatest(coalesce(public.user_lesson_progress.best_quiz_score, 0), v_score),
    attempts_count = public.user_lesson_progress.attempts_count + 1,
    completed_at = case when v_passed and public.user_lesson_progress.completed_at is null then now() else public.user_lesson_progress.completed_at end,
    last_accessed_at = now()
  returning * into v_progress;

  update public.quiz_attempts set xp_earned = v_xp where id = v_attempt_id;

  perform public.bump_daily_activity(
    v_user, 5,
    case when v_passed and not v_was_completed then 1 else 0 end,
    1, v_xp
  );

  if v_xp > 0 then
    perform public.update_streak_and_xp(v_user, v_xp);
  end if;

  perform public.check_and_award_achievements(v_user);

  return jsonb_build_object(
    'attempt_id', v_attempt_id,
    'score', v_score,
    'correct_answers', v_correct,
    'incorrect_answers', v_total - v_correct,
    'total_questions', v_total,
    'passed', v_passed,
    'xp_earned', v_xp,
    'best_quiz_score', v_progress.best_quiz_score,
    'lesson_status', v_progress.status,
    'review', v_review
  );
end;
$$;

-- ============================================================================
-- submit_speaking_score: records the highest speaking-practice score.
-- ============================================================================
create or replace function public.submit_speaking_score(p_lesson_id uuid, p_score integer)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_previous_best integer;
  v_xp integer := 0;
begin
  if v_user is null then
    raise exception 'Anda harus masuk untuk melanjutkan.' using errcode = '28000';
  end if;

  if p_score < 0 or p_score > 100 then
    raise exception 'Skor tidak valid.' using errcode = '22003';
  end if;

  if not exists (select 1 from public.lessons where id = p_lesson_id and is_published) then
    raise exception 'Pelajaran tidak ditemukan.' using errcode = 'P0002';
  end if;

  select best_speaking_score into v_previous_best
  from public.user_lesson_progress where user_id = v_user and lesson_id = p_lesson_id;

  if p_score > 80 and (v_previous_best is null or v_previous_best <= 80) then
    v_xp := v_xp + 10;
  end if;

  insert into public.user_lesson_progress (user_id, lesson_id, status, best_speaking_score, attempts_count, last_accessed_at)
  values (v_user, p_lesson_id, 'in_progress', p_score, 1, now())
  on conflict (user_id, lesson_id) do update set
    best_speaking_score = greatest(coalesce(public.user_lesson_progress.best_speaking_score, 0), p_score),
    status = case when public.user_lesson_progress.status = 'not_started' then 'in_progress' else public.user_lesson_progress.status end,
    last_accessed_at = now();

  perform public.bump_daily_activity(v_user, 3, 0, 0, v_xp);

  if v_xp > 0 then
    perform public.update_streak_and_xp(v_user, v_xp);
  else
    update public.profiles set last_activity_date = current_date where id = v_user and (last_activity_date is null or last_activity_date < current_date);
  end if;

  perform public.check_and_award_achievements(v_user);

  return jsonb_build_object(
    'best_speaking_score', greatest(coalesce(v_previous_best, 0), p_score),
    'xp_earned', v_xp
  );
end;
$$;

-- ============================================================================
-- submit_placement_test: stores the attempt and grants "preview access" up
-- to the recommended level (the user can still choose to start at Pre-A1).
-- ============================================================================
create or replace function public.submit_placement_test(p_score integer)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_level record;
begin
  if v_user is null then
    raise exception 'Anda harus masuk untuk melanjutkan.' using errcode = '28000';
  end if;

  if p_score < 0 or p_score > 100 then
    raise exception 'Skor tidak valid.' using errcode = '22003';
  end if;

  select * into v_level from public.levels
  where order_index = case
    when p_score <= 20 then 0
    when p_score <= 40 then 1
    when p_score <= 55 then 2
    when p_score <= 70 then 3
    when p_score <= 85 then 4
    else 5
  end
  limit 1;

  insert into public.placement_test_attempts (user_id, score, recommended_level)
  values (v_user, p_score, coalesce(v_level.slug, 'pre-a1'));

  if v_level.id is not null then
    perform set_config('app.bypass_profile_guard', 'on', true);
    update public.profiles set placement_recommended_level_id = v_level.id where id = v_user;
    perform set_config('app.bypass_profile_guard', 'off', true);
  end if;

  return jsonb_build_object(
    'recommended_level_slug', coalesce(v_level.slug, 'pre-a1'),
    'recommended_level_name', coalesce(v_level.name, 'Pre-A1'),
    'score', p_score
  );
end;
$$;

-- ============================================================================
-- admin_set_user_role: the only way to promote/demote a user's role from
-- the app. Bypasses the profile guard trigger only after confirming the
-- caller is already an admin.
-- ============================================================================
create or replace function public.admin_set_user_role(p_user_id uuid, p_role text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Anda tidak memiliki izin untuk melakukan tindakan ini.' using errcode = '42501';
  end if;

  if p_role not in ('user', 'admin') then
    raise exception 'Peran tidak valid.' using errcode = '22023';
  end if;

  perform set_config('app.bypass_profile_guard', 'on', true);
  update public.profiles set role = p_role where id = p_user_id;
  perform set_config('app.bypass_profile_guard', 'off', true);
end;
$$;

grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.admin_set_user_role(uuid, text) to authenticated;
grant execute on function public.is_level_unlocked(uuid) to authenticated;
grant execute on function public.is_lesson_unlocked(uuid) to authenticated;
grant execute on function public.mark_lesson_started(uuid) to authenticated;
grant execute on function public.submit_quiz_attempt(uuid, jsonb) to authenticated;
grant execute on function public.submit_speaking_score(uuid, integer) to authenticated;
grant execute on function public.submit_placement_test(integer) to authenticated;
