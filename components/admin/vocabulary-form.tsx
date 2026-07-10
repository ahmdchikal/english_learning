"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vocabularyFormSchema, type VocabularyFormValues } from "@/lib/validations/admin";
import { upsertVocabularyAction } from "@/lib/actions/admin";
import type { Vocabulary } from "@/types/database";

export function VocabularyForm({
  lessonId,
  item,
  onSuccess,
}: {
  lessonId: string;
  item?: Vocabulary;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VocabularyFormValues>({
    resolver: zodResolver(vocabularyFormSchema),
    defaultValues: {
      lesson_id: lessonId,
      english_word: item?.english_word ?? "",
      indonesian_meaning: item?.indonesian_meaning ?? "",
      phonetic: item?.phonetic ?? "",
      example_sentence: item?.example_sentence ?? "",
      example_translation: item?.example_translation ?? "",
      word_type: item?.word_type ?? "noun",
      order_index: item?.order_index ?? 0,
    },
  });

  async function onSubmit(values: VocabularyFormValues) {
    const result = await upsertVocabularyAction(item?.id ?? null, values);
    if (!result.success) {
      toast.error(result.message ?? "Gagal menyimpan kosakata.");
      return;
    }
    toast.success(result.message ?? "Kosakata berhasil disimpan.");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="english_word">Kata Bahasa Inggris</Label>
          <Input id="english_word" {...register("english_word")} aria-invalid={!!errors.english_word} />
          {errors.english_word && <p className="text-sm text-destructive">{errors.english_word.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="indonesian_meaning">Arti Bahasa Indonesia</Label>
          <Input id="indonesian_meaning" {...register("indonesian_meaning")} aria-invalid={!!errors.indonesian_meaning} />
          {errors.indonesian_meaning && (
            <p className="text-sm text-destructive">{errors.indonesian_meaning.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phonetic">Fonetik</Label>
          <Input id="phonetic" {...register("phonetic")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="word_type">Jenis Kata</Label>
          <Input id="word_type" {...register("word_type")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="example_sentence">Contoh Kalimat</Label>
        <Input id="example_sentence" {...register("example_sentence")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="example_translation">Terjemahan Contoh</Label>
        <Input id="example_translation" {...register("example_translation")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="order_index">Urutan</Label>
        <Input id="order_index" type="number" {...register("order_index", { valueAsNumber: true })} />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Kosakata
      </Button>
    </form>
  );
}
