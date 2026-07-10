import { z } from "zod";

export const levelFormSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(50),
  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  cefr_code: z.string().trim().min(1, "Kode CEFR wajib diisi").max(20),
  title: z.string().trim().min(1, "Judul wajib diisi").max(100),
  description: z.string().trim().max(2000),
  order_index: z.number().int().min(0),
  required_xp: z.number().int().min(0),
  force_unlocked: z.boolean(),
  is_published: z.boolean(),
});
export type LevelFormValues = z.infer<typeof levelFormSchema>;

export const unitFormSchema = z.object({
  level_id: z.string().uuid("Level wajib dipilih"),
  title: z.string().trim().min(1, "Judul wajib diisi").max(150),
  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  description: z.string().trim().max(2000),
  order_index: z.number().int().min(0),
  force_unlocked: z.boolean(),
  is_published: z.boolean(),
});
export type UnitFormValues = z.infer<typeof unitFormSchema>;

export const lessonFormSchema = z.object({
  unit_id: z.string().uuid("Unit wajib dipilih"),
  title: z.string().trim().min(1, "Judul wajib diisi").max(150),
  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  description: z.string().trim().max(2000),
  learning_objectives: z.array(z.string().trim().min(1)),
  explanation: z.string().trim().max(10000),
  grammar_notes: z.string().trim().max(5000),
  common_mistakes: z.string().trim().max(5000),
  estimated_minutes: z.number().int().min(1).max(180),
  xp_reward: z.number().int().min(0).max(1000),
  order_index: z.number().int().min(0),
  force_unlocked: z.boolean(),
  is_published: z.boolean(),
});
export type LessonFormValues = z.infer<typeof lessonFormSchema>;

export const vocabularyFormSchema = z.object({
  lesson_id: z.string().uuid(),
  english_word: z.string().trim().min(1, "Kata wajib diisi").max(200),
  indonesian_meaning: z.string().trim().min(1, "Arti wajib diisi").max(200),
  phonetic: z.string().trim().max(100),
  example_sentence: z.string().trim().max(500),
  example_translation: z.string().trim().max(500),
  word_type: z.string().trim().max(50),
  order_index: z.number().int().min(0),
});
export type VocabularyFormValues = z.infer<typeof vocabularyFormSchema>;

export const lessonExampleFormSchema = z.object({
  lesson_id: z.string().uuid(),
  english_text: z.string().trim().min(1, "Kalimat Bahasa Inggris wajib diisi").max(500),
  indonesian_text: z.string().trim().min(1, "Terjemahan wajib diisi").max(500),
  explanation: z.string().trim().max(1000),
  order_index: z.number().int().min(0),
});
export type LessonExampleFormValues = z.infer<typeof lessonExampleFormSchema>;

export const questionTypeEnum = z.enum([
  "multiple_choice",
  "fill_blank",
  "sentence_arrangement",
  "matching",
  "listening",
  "translation",
  "speaking",
  "true_false",
]);

export const questionOptionInputSchema = z.object({
  option_text: z.string().trim().min(1, "Pilihan tidak boleh kosong"),
  is_correct: z.boolean(),
});

export const questionFormSchema = z.object({
  lesson_id: z.string().uuid().nullable(),
  is_placement_question: z.boolean(),
  type: questionTypeEnum,
  prompt: z.string().trim().min(1, "Pertanyaan wajib diisi").max(1000),
  instruction: z.string().trim().max(1000),
  correct_answer: z.string().trim().min(1, "Jawaban benar wajib diisi").max(500),
  explanation: z.string().trim().max(2000),
  audio_text: z.string().trim().max(500).nullable(),
  difficulty: z.enum(["beginner", "elementary", "intermediate", "upper_intermediate", "advanced"]),
  order_index: z.number().int().min(0),
  points: z.number().int().min(1).max(10),
  options: z.array(questionOptionInputSchema),
});
export type QuestionFormValues = z.infer<typeof questionFormSchema>;
