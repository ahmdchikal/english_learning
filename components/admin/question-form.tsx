"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { questionFormSchema, type QuestionFormValues } from "@/lib/validations/admin";
import { upsertQuestionAction } from "@/lib/actions/admin";
import type { Lesson, Question, QuestionOption } from "@/types/database";

const QUESTION_TYPES: { value: QuestionFormValues["type"]; label: string; needsOptions: boolean }[] = [
  { value: "multiple_choice", label: "Pilihan Ganda", needsOptions: true },
  { value: "fill_blank", label: "Isian Singkat", needsOptions: false },
  { value: "sentence_arrangement", label: "Susun Kalimat", needsOptions: false },
  { value: "matching", label: "Mencocokkan", needsOptions: false },
  { value: "listening", label: "Mendengarkan", needsOptions: true },
  { value: "translation", label: "Menerjemahkan", needsOptions: false },
  { value: "speaking", label: "Berbicara", needsOptions: false },
  { value: "true_false", label: "Benar/Salah", needsOptions: true },
];

const DIFFICULTIES: QuestionFormValues["difficulty"][] = [
  "beginner",
  "elementary",
  "intermediate",
  "upper_intermediate",
  "advanced",
];

export function QuestionForm({
  question,
  lessons,
  onSuccess,
}: {
  question?: Question & { options: QuestionOption[] };
  lessons: Pick<Lesson, "id" | "title">[];
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      lesson_id: question?.lesson_id ?? null,
      is_placement_question: question?.is_placement_question ?? false,
      type: question?.type ?? "multiple_choice",
      prompt: question?.prompt ?? "",
      instruction: question?.instruction ?? "",
      correct_answer: question?.correct_answer ?? "",
      explanation: question?.explanation ?? "",
      audio_text: question?.audio_text ?? null,
      difficulty: question?.difficulty ?? "beginner",
      order_index: question?.order_index ?? 0,
      points: question?.points ?? 1,
      options:
        question?.options.map((o) => ({ option_text: o.option_text, is_correct: o.is_correct })) ?? [
          { option_text: "", is_correct: true },
          { option_text: "", is_correct: false },
        ],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "options" });
  const values = useWatch({ control });
  const selectedType = values.type ?? "multiple_choice";
  const typeConfig = QUESTION_TYPES.find((t) => t.value === selectedType);

  async function onSubmit(formValues: QuestionFormValues) {
    const payload = { ...formValues, options: typeConfig?.needsOptions ? formValues.options : [] };
    const result = await upsertQuestionAction(question?.id ?? null, payload);
    if (!result.success) {
      toast.error(result.message ?? "Gagal menyimpan soal.");
      return;
    }
    toast.success(result.message ?? "Soal berhasil disimpan.");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex items-center justify-between">
        <Label htmlFor="is_placement_question">Soal Tes Penempatan</Label>
        <Switch
          id="is_placement_question"
          checked={values.is_placement_question ?? false}
          onCheckedChange={(checked) => {
            setValue("is_placement_question", checked);
            if (checked) setValue("lesson_id", null);
          }}
        />
      </div>

      {!values.is_placement_question && (
        <div className="space-y-2">
          <Label htmlFor="lesson_id">Pelajaran</Label>
          <Select value={values.lesson_id ?? ""} onValueChange={(v) => setValue("lesson_id", v || null)}>
            <SelectTrigger id="lesson_id" className="w-full">
              <SelectValue placeholder="Pilih pelajaran" />
            </SelectTrigger>
            <SelectContent>
              {lessons.map((lesson) => (
                <SelectItem key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.lesson_id && <p className="text-sm text-destructive">Pelajaran wajib dipilih.</p>}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Tipe Soal</Label>
          <Select value={values.type} onValueChange={(v) => v && setValue("type", v as QuestionFormValues["type"])}>
            <SelectTrigger id="type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUESTION_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
          <Select
            value={values.difficulty}
            onValueChange={(v) => v && setValue("difficulty", v as QuestionFormValues["difficulty"])}
          >
            <SelectTrigger id="difficulty" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prompt">Pertanyaan / Prompt</Label>
        <Textarea id="prompt" rows={2} {...register("prompt")} aria-invalid={!!errors.prompt} />
        {errors.prompt && <p className="text-sm text-destructive">{errors.prompt.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="instruction">Instruksi (Bahasa Indonesia)</Label>
        <Textarea id="instruction" rows={2} {...register("instruction")} />
      </div>

      {selectedType === "listening" && (
        <div className="space-y-2">
          <Label htmlFor="audio_text">Teks Audio (untuk text-to-speech)</Label>
          <Input id="audio_text" {...register("audio_text")} />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="correct_answer">Jawaban Benar</Label>
        <Input id="correct_answer" {...register("correct_answer")} aria-invalid={!!errors.correct_answer} />
        {errors.correct_answer && <p className="text-sm text-destructive">{errors.correct_answer.message}</p>}
        {selectedType === "matching" && (
          <p className="text-xs text-muted-foreground">Format: kata=arti (contoh: hello=halo)</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Penjelasan Jawaban</Label>
        <Textarea id="explanation" rows={2} {...register("explanation")} />
      </div>

      {typeConfig?.needsOptions && (
        <div className="space-y-2">
          <Label>Pilihan Jawaban</Label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Checkbox
                  checked={values.options?.[index]?.is_correct ?? false}
                  onCheckedChange={(checked) => setValue(`options.${index}.is_correct`, Boolean(checked))}
                />
                <Input
                  {...register(`options.${index}.option_text`)}
                  placeholder={`Pilihan ${index + 1}`}
                  className="flex-1"
                />
                <Button type="button" size="icon-sm" variant="ghost" onClick={() => remove(index)}>
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" size="sm" variant="outline" onClick={() => append({ option_text: "", is_correct: false })}>
            <Plus className="size-4" />
            Tambah Pilihan
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order_index">Urutan</Label>
          <Input id="order_index" type="number" {...register("order_index", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="points">Poin</Label>
          <Input id="points" type="number" {...register("points", { valueAsNumber: true })} />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Soal
      </Button>
    </form>
  );
}
