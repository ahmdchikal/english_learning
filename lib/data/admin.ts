import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  Level,
  Lesson,
  LessonExample,
  Question,
  QuestionOption,
  Unit,
  Vocabulary,
} from "@/types/database";

export interface AdminOverviewStats {
  totalUsers: number;
  totalLevels: number;
  totalUnits: number;
  totalLessons: number;
  publishedLessons: number;
  draftLessons: number;
  totalQuestions: number;
  totalQuizAttempts: number;
  totalAdmins: number;
}

export async function getAdminOverviewStats(): Promise<AdminOverviewStats> {
  const supabase = await createClient();

  const [
    profilesCount,
    adminsCount,
    levelsCount,
    unitsCount,
    lessonsRes,
    questionsCount,
    attemptsCount,
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "admin"),
    supabase.from("levels").select("*", { count: "exact", head: true }),
    supabase.from("units").select("*", { count: "exact", head: true }),
    supabase.from("lessons").select("is_published"),
    supabase.from("questions").select("*", { count: "exact", head: true }),
    supabase.from("quiz_attempts").select("*", { count: "exact", head: true }),
  ]);

  const lessons = (lessonsRes.data as Pick<Lesson, "is_published">[]) ?? [];

  return {
    totalUsers: profilesCount.count ?? 0,
    totalAdmins: adminsCount.count ?? 0,
    totalLevels: levelsCount.count ?? 0,
    totalUnits: unitsCount.count ?? 0,
    totalLessons: lessons.length,
    publishedLessons: lessons.filter((l) => l.is_published).length,
    draftLessons: lessons.filter((l) => !l.is_published).length,
    totalQuestions: questionsCount.count ?? 0,
    totalQuizAttempts: attemptsCount.count ?? 0,
  };
}

export async function getAllLevels(): Promise<Level[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("levels")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as Level[]) ?? [];
}

export async function getAllUnits(): Promise<
  (Unit & { level: Pick<Level, "id" | "title" | "cefr_code"> })[]
> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("units")
    .select("*, level:levels(id, title, cefr_code)")
    .order("order_index", { ascending: true });
  return (data as (Unit & { level: Pick<Level, "id" | "title" | "cefr_code"> })[]) ?? [];
}

export async function getAllLessons(): Promise<(Lesson & { unit: Pick<Unit, "id" | "title"> })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select("*, unit:units(id, title)")
    .order("order_index", { ascending: true });
  return (data as (Lesson & { unit: Pick<Unit, "id" | "title"> })[]) ?? [];
}

export async function getAllQuestions(): Promise<
  (Question & { options: QuestionOption[]; lesson: Pick<Lesson, "id" | "title"> | null })[]
> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("questions")
    .select("*, lesson:lessons(id, title)")
    .order("created_at", { ascending: false });
  const questions = (data as (Question & { lesson: Pick<Lesson, "id" | "title"> | null })[]) ?? [];
  if (questions.length === 0) return [];

  const { data: optionsData } = await supabase
    .from("question_options")
    .select("*")
    .in(
      "question_id",
      questions.map((q) => q.id)
    );
  const options = (optionsData as QuestionOption[]) ?? [];

  return questions.map((q) => ({
    ...q,
    options: options
      .filter((o) => o.question_id === q.id)
      .sort((a, b) => a.order_index - b.order_index),
  }));
}

export interface AdminLessonDetail {
  lesson: Lesson;
  vocabulary: Vocabulary[];
  examples: LessonExample[];
  questions: (Question & { options: QuestionOption[] })[];
}

export async function getAdminLessonDetail(lessonId: string): Promise<AdminLessonDetail | null> {
  const supabase = await createClient();

  const { data: lesson } = await supabase.from("lessons").select("*").eq("id", lessonId).single();
  if (!lesson) return null;

  const [{ data: vocabulary }, { data: examples }, { data: questions }] = await Promise.all([
    supabase
      .from("vocabulary")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true }),
    supabase
      .from("lesson_examples")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true }),
    supabase
      .from("questions")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true }),
  ]);

  const questionRows = (questions as Question[]) ?? [];
  let options: QuestionOption[] = [];
  if (questionRows.length > 0) {
    const { data: optionsData } = await supabase
      .from("question_options")
      .select("*")
      .in(
        "question_id",
        questionRows.map((q) => q.id)
      );
    options = (optionsData as QuestionOption[]) ?? [];
  }

  return {
    lesson: lesson as Lesson,
    vocabulary: (vocabulary as Vocabulary[]) ?? [],
    examples: (examples as LessonExample[]) ?? [],
    questions: questionRows.map((q) => ({
      ...q,
      options: options
        .filter((o) => o.question_id === q.id)
        .sort((a, b) => a.order_index - b.order_index),
    })),
  };
}

export interface AdminUserRow {
  id: string;
  email: string | null;
  fullName: string;
  role: "user" | "admin";
  totalXp: number;
  currentStreak: number;
  createdAt: string;
}

export async function getAllUsersForAdmin(): Promise<AdminUserRow[]> {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, total_xp, current_streak, created_at")
    .order("created_at", { ascending: false });

  const rows = profiles ?? [];

  let emailById = new Map<string, string>();
  try {
    const adminClient = createAdminClient();
    const { data: usersData } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
    emailById = new Map(usersData.users.map((u) => [u.id, u.email ?? ""]));
  } catch {
    // Service role not configured (e.g. local dev without env vars) — fall
    // back to showing profiles without email instead of crashing the page.
  }

  return rows.map((row) => ({
    id: row.id,
    email: emailById.get(row.id) ?? null,
    fullName: row.full_name || "Tanpa nama",
    role: row.role,
    totalXp: row.total_xp,
    currentStreak: row.current_streak,
    createdAt: row.created_at,
  }));
}
