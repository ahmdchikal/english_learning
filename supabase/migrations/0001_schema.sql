-- EnglishPath database schema
-- Run this migration in the Supabase SQL editor or via the Supabase CLI.
-- This file creates every table required by the application.

create extension if not exists pgcrypto;

-- ============================================================================
-- ENUM-LIKE CHECK CONSTRAINTS
-- Plain text + check constraints are used instead of Postgres enums so that
-- values can be extended later without an ALTER TYPE migration.
-- ============================================================================

-- ============================================================================
-- LEVELS (CEFR levels: Pre-A1, A1, A2, B1, B2, C1)
-- ============================================================================
create table if not exists public.levels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  cefr_code text not null,
  title text not null,
  description text not null default '',
  order_index integer not null default 0,
  required_xp integer not null default 0,
  force_unlocked boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.levels.force_unlocked is 'When true, administrators bypass the normal progress-based unlock rules for this level.';

-- ============================================================================
-- UNITS
-- ============================================================================
create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  title text not null,
  slug text not null,
  description text not null default '',
  order_index integer not null default 0,
  force_unlocked boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (level_id, slug)
);

create index if not exists units_level_id_idx on public.units(level_id);

-- ============================================================================
-- LESSONS
-- ============================================================================
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  title text not null,
  slug text not null,
  description text not null default '',
  learning_objectives text[] not null default array[]::text[],
  explanation text not null default '',
  grammar_notes text not null default '',
  common_mistakes text not null default '',
  estimated_minutes integer not null default 10,
  xp_reward integer not null default 20,
  order_index integer not null default 0,
  force_unlocked boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, slug)
);

create index if not exists lessons_unit_id_idx on public.lessons(unit_id);

-- ============================================================================
-- VOCABULARY
-- ============================================================================
create table if not exists public.vocabulary (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  english_word text not null,
  indonesian_meaning text not null,
  phonetic text not null default '',
  example_sentence text not null default '',
  example_translation text not null default '',
  word_type text not null default 'noun',
  order_index integer not null default 0
);

create index if not exists vocabulary_lesson_id_idx on public.vocabulary(lesson_id);

-- ============================================================================
-- LESSON EXAMPLES (example sentences / dialogues)
-- ============================================================================
create table if not exists public.lesson_examples (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  english_text text not null,
  indonesian_text text not null,
  explanation text not null default '',
  order_index integer not null default 0
);

create index if not exists lesson_examples_lesson_id_idx on public.lesson_examples(lesson_id);

-- ============================================================================
-- QUESTIONS (used both for lesson quizzes and the placement test)
-- type: multiple_choice | fill_blank | sentence_arrangement | matching |
--       listening | translation | speaking | true_false
-- ============================================================================
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  type text not null check (type in (
    'multiple_choice', 'fill_blank', 'sentence_arrangement', 'matching',
    'listening', 'translation', 'speaking', 'true_false'
  )),
  prompt text not null,
  instruction text not null default '',
  correct_answer text not null,
  explanation text not null default '',
  audio_text text,
  difficulty text not null default 'beginner' check (difficulty in ('beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced')),
  order_index integer not null default 0,
  points integer not null default 1,
  is_placement_question boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists questions_lesson_id_idx on public.questions(lesson_id);
create index if not exists questions_placement_idx on public.questions(is_placement_question);

-- ============================================================================
-- QUESTION OPTIONS
-- ============================================================================
create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false,
  order_index integer not null default 0
);

create index if not exists question_options_question_id_idx on public.question_options(question_id);

-- ============================================================================
-- PROFILES (1-1 with auth.users)
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  active_level_id uuid references public.levels(id),
  placement_recommended_level_id uuid references public.levels(id),
  total_xp integer not null default 0,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  daily_goal_minutes integer not null default 15,
  sound_enabled boolean not null default true,
  tts_speed numeric(3, 2) not null default 1.0,
  theme text not null default 'system' check (theme in ('light', 'dark', 'system')),
  last_activity_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- USER LESSON PROGRESS
-- ============================================================================
create table if not exists public.user_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completion_percentage integer not null default 0 check (completion_percentage between 0 and 100),
  best_quiz_score integer check (best_quiz_score between 0 and 100),
  best_speaking_score integer check (best_speaking_score between 0 and 100),
  attempts_count integer not null default 0,
  completed_at timestamptz,
  last_accessed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists user_lesson_progress_user_id_idx on public.user_lesson_progress(user_id);
create index if not exists user_lesson_progress_lesson_id_idx on public.user_lesson_progress(lesson_id);

-- ============================================================================
-- QUIZ ATTEMPTS
-- ============================================================================
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  correct_answers integer not null default 0,
  incorrect_answers integer not null default 0,
  total_questions integer not null default 0,
  xp_earned integer not null default 0,
  passed boolean not null default false,
  started_at timestamptz not null default now(),
  completed_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_id_idx on public.quiz_attempts(user_id);
create index if not exists quiz_attempts_lesson_id_idx on public.quiz_attempts(lesson_id);

-- ============================================================================
-- QUIZ ANSWERS
-- ============================================================================
create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  submitted_answer text not null default '',
  is_correct boolean not null default false,
  points_earned integer not null default 0
);

create index if not exists quiz_answers_attempt_id_idx on public.quiz_answers(attempt_id);

-- ============================================================================
-- DAILY ACTIVITIES
-- ============================================================================
create table if not exists public.daily_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_date date not null,
  minutes_learned integer not null default 0,
  lessons_completed integer not null default 0,
  quizzes_completed integer not null default 0,
  xp_earned integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, activity_date)
);

create index if not exists daily_activities_user_id_idx on public.daily_activities(user_id);

-- ============================================================================
-- ACHIEVEMENTS (definitions)
-- requirement_type: lessons_completed | quiz_perfect | streak_days |
--                    vocabulary_completed | speaking_attempts
-- ============================================================================
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  icon text not null default 'award',
  xp_reward integer not null default 0,
  requirement_type text not null check (requirement_type in (
    'lessons_completed', 'quiz_perfect', 'streak_days', 'vocabulary_completed', 'speaking_attempts'
  )),
  requirement_value integer not null default 1
);

-- ============================================================================
-- USER ACHIEVEMENTS
-- ============================================================================
create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

create index if not exists user_achievements_user_id_idx on public.user_achievements(user_id);

-- ============================================================================
-- PLACEMENT TEST ATTEMPTS
-- ============================================================================
create table if not exists public.placement_test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  recommended_level text not null,
  completed_at timestamptz not null default now()
);

create index if not exists placement_test_attempts_user_id_idx on public.placement_test_attempts(user_id);
