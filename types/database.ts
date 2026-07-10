// Hand-written TypeScript types mirroring the Supabase schema defined in
// supabase/migrations/. Keeping these in sync manually (instead of using the
// Supabase CLI codegen) keeps the project buildable without a live database
// connection during development.

export type UserRole = "user" | "admin";
export type ThemePreference = "light" | "dark" | "system";
export type LessonStatus = "not_started" | "in_progress" | "completed";
export type QuestionType =
  | "multiple_choice"
  | "fill_blank"
  | "sentence_arrangement"
  | "matching"
  | "listening"
  | "translation"
  | "speaking"
  | "true_false";
export type QuestionDifficulty =
  | "beginner"
  | "elementary"
  | "intermediate"
  | "upper_intermediate"
  | "advanced";
export type AchievementRequirementType =
  | "lessons_completed"
  | "quiz_perfect"
  | "streak_days"
  | "vocabulary_completed"
  | "speaking_attempts";

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  active_level_id: string | null;
  placement_recommended_level_id: string | null;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  daily_goal_minutes: number;
  sound_enabled: boolean;
  tts_speed: number;
  theme: ThemePreference;
  last_activity_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Level {
  id: string;
  name: string;
  slug: string;
  cefr_code: string;
  title: string;
  description: string;
  order_index: number;
  required_xp: number;
  force_unlocked: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: string;
  level_id: string;
  title: string;
  slug: string;
  description: string;
  order_index: number;
  force_unlocked: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  slug: string;
  description: string;
  learning_objectives: string[];
  explanation: string;
  grammar_notes: string;
  common_mistakes: string;
  estimated_minutes: number;
  xp_reward: number;
  order_index: number;
  force_unlocked: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vocabulary {
  id: string;
  lesson_id: string;
  english_word: string;
  indonesian_meaning: string;
  phonetic: string;
  example_sentence: string;
  example_translation: string;
  word_type: string;
  order_index: number;
}

export interface LessonExample {
  id: string;
  lesson_id: string;
  english_text: string;
  indonesian_text: string;
  explanation: string;
  order_index: number;
}

export interface Question {
  id: string;
  lesson_id: string | null;
  type: QuestionType;
  prompt: string;
  instruction: string;
  correct_answer: string;
  explanation: string;
  audio_text: string | null;
  difficulty: QuestionDifficulty;
  order_index: number;
  points: number;
  is_placement_question: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  order_index: number;
}

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: LessonStatus;
  completion_percentage: number;
  best_quiz_score: number | null;
  best_speaking_score: number | null;
  attempts_count: number;
  completed_at: string | null;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  lesson_id: string;
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  total_questions: number;
  xp_earned: number;
  passed: boolean;
  started_at: string;
  completed_at: string;
}

export interface QuizAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  submitted_answer: string;
  is_correct: boolean;
  points_earned: number;
}

export interface DailyActivity {
  id: string;
  user_id: string;
  activity_date: string;
  minutes_learned: number;
  lessons_completed: number;
  quizzes_completed: number;
  xp_earned: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  xp_reward: number;
  requirement_type: AchievementRequirementType;
  requirement_value: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}

export interface PlacementTestAttempt {
  id: string;
  user_id: string;
  score: number;
  recommended_level: string;
  completed_at: string;
}

// ---- RPC result shapes ----

export interface QuizReviewItem {
  question_id: string;
  prompt: string;
  submitted_answer: string;
  correct_answer: string;
  is_correct: boolean;
  explanation: string;
}

export interface SubmitQuizAttemptResult {
  attempt_id: string;
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  total_questions: number;
  passed: boolean;
  xp_earned: number;
  best_quiz_score: number;
  lesson_status: LessonStatus;
  review: QuizReviewItem[];
}

export interface SubmitSpeakingScoreResult {
  best_speaking_score: number;
  xp_earned: number;
}

export interface SubmitPlacementTestResult {
  recommended_level_slug: string;
  recommended_level_name: string;
  score: number;
}
