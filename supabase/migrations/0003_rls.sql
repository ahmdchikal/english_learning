-- EnglishPath: Row Level Security policies.
-- General rules:
--  * Published learning content is readable by everyone (including anon).
--  * Only admins can write learning content.
--  * Users can only read their own personal data.
--  * Personal progress/XP tables have NO client-side INSERT/UPDATE policy;
--    all writes go through the SECURITY DEFINER functions in 0002_functions.sql
--    (mark_lesson_started, submit_quiz_attempt, submit_speaking_score,
--    submit_placement_test), which validate everything server-side.

alter table public.levels enable row level security;
alter table public.units enable row level security;
alter table public.lessons enable row level security;
alter table public.vocabulary enable row level security;
alter table public.lesson_examples enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.profiles enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.daily_activities enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.placement_test_attempts enable row level security;

-- ============================================================================
-- LEVELS / UNITS / LESSONS (content)
-- ============================================================================
drop policy if exists levels_select on public.levels;
create policy levels_select on public.levels for select
  using (is_published or public.is_admin());

drop policy if exists levels_write on public.levels;
create policy levels_write on public.levels for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists units_select on public.units;
create policy units_select on public.units for select
  using (is_published or public.is_admin());

drop policy if exists units_write on public.units;
create policy units_write on public.units for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists lessons_select on public.lessons;
create policy lessons_select on public.lessons for select
  using (is_published or public.is_admin());

drop policy if exists lessons_write on public.lessons;
create policy lessons_write on public.lessons for all
  using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- VOCABULARY / EXAMPLES / QUESTIONS / OPTIONS (inherit lesson publish state)
-- ============================================================================
drop policy if exists vocabulary_select on public.vocabulary;
create policy vocabulary_select on public.vocabulary for select
  using (
    public.is_admin() or exists (
      select 1 from public.lessons l where l.id = vocabulary.lesson_id and l.is_published
    )
  );

drop policy if exists vocabulary_write on public.vocabulary;
create policy vocabulary_write on public.vocabulary for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists lesson_examples_select on public.lesson_examples;
create policy lesson_examples_select on public.lesson_examples for select
  using (
    public.is_admin() or exists (
      select 1 from public.lessons l where l.id = lesson_examples.lesson_id and l.is_published
    )
  );

drop policy if exists lesson_examples_write on public.lesson_examples;
create policy lesson_examples_write on public.lesson_examples for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists questions_select on public.questions;
create policy questions_select on public.questions for select
  using (
    public.is_admin() or is_placement_question or exists (
      select 1 from public.lessons l where l.id = questions.lesson_id and l.is_published
    )
  );

drop policy if exists questions_write on public.questions;
create policy questions_write on public.questions for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists question_options_select on public.question_options;
create policy question_options_select on public.question_options for select
  using (
    public.is_admin() or exists (
      select 1 from public.questions q
      left join public.lessons l on l.id = q.lesson_id
      where q.id = question_options.question_id
        and (q.is_placement_question or (l.id is not null and l.is_published))
    )
  );

drop policy if exists question_options_write on public.question_options;
create policy question_options_write on public.question_options for all
  using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- PROFILES
-- ============================================================================
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- ============================================================================
-- USER LESSON PROGRESS (read-only from the client; writes go through RPCs)
-- ============================================================================
drop policy if exists user_lesson_progress_select on public.user_lesson_progress;
create policy user_lesson_progress_select on public.user_lesson_progress for select
  using (auth.uid() = user_id or public.is_admin());

-- ============================================================================
-- QUIZ ATTEMPTS / ANSWERS (read-only from the client)
-- ============================================================================
drop policy if exists quiz_attempts_select on public.quiz_attempts;
create policy quiz_attempts_select on public.quiz_attempts for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists quiz_answers_select on public.quiz_answers;
create policy quiz_answers_select on public.quiz_answers for select
  using (
    public.is_admin() or exists (
      select 1 from public.quiz_attempts qa where qa.id = quiz_answers.attempt_id and qa.user_id = auth.uid()
    )
  );

-- ============================================================================
-- DAILY ACTIVITIES (read-only from the client)
-- ============================================================================
drop policy if exists daily_activities_select on public.daily_activities;
create policy daily_activities_select on public.daily_activities for select
  using (auth.uid() = user_id or public.is_admin());

-- ============================================================================
-- ACHIEVEMENTS (public catalog, admin managed)
-- ============================================================================
drop policy if exists achievements_select on public.achievements;
create policy achievements_select on public.achievements for select using (true);

drop policy if exists achievements_write on public.achievements;
create policy achievements_write on public.achievements for all
  using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- USER ACHIEVEMENTS (read-only from the client)
-- ============================================================================
drop policy if exists user_achievements_select on public.user_achievements;
create policy user_achievements_select on public.user_achievements for select
  using (auth.uid() = user_id or public.is_admin());

-- ============================================================================
-- PLACEMENT TEST ATTEMPTS (read-only from the client)
-- ============================================================================
drop policy if exists placement_test_attempts_select on public.placement_test_attempts;
create policy placement_test_attempts_select on public.placement_test_attempts for select
  using (auth.uid() = user_id or public.is_admin());
