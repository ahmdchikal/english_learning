"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { lessonExampleFormSchema, type LessonExampleFormValues } from "@/lib/validations/admin";
import { upsertLessonExampleAction } from "@/lib/actions/admin";
import type { LessonExample } from "@/types/database";

export function LessonExampleForm({
  lessonId,
  item,
  onSuccess,
}: {
  lessonId: string;
  item?: LessonExample;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LessonExampleFormValues>({
    resolver: zodResolver(lessonExampleFormSchema),
    defaultValues: {
      lesson_id: lessonId,
      english_text: item?.english_text ?? "",
      indonesian_text: item?.indonesian_text ?? "",
      explanation: item?.explanation ?? "",
      order_index: item?.order_index ?? 0,
    },
  });

  async function onSubmit(values: LessonExampleFormValues) {
    const result = await upsertLessonExampleAction(item?.id ?? null, values);
    if (!result.success) {
      toast.error(result.message ?? "Gagal menyimpan contoh kalimat.");
      return;
    }
    toast.success(result.message ?? "Contoh kalimat berhasil disimpan.");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="english_text">Kalimat Bahasa Inggris</Label>
        <Input id="english_text" {...register("english_text")} aria-invalid={!!errors.english_text} />
        {errors.english_text && <p className="text-sm text-destructive">{errors.english_text.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="indonesian_text">Terjemahan</Label>
        <Input id="indonesian_text" {...register("indonesian_text")} aria-invalid={!!errors.indonesian_text} />
        {errors.indonesian_text && <p className="text-sm text-destructive">{errors.indonesian_text.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="explanation">Catatan Penggunaan</Label>
        <Textarea id="explanation" rows={2} {...register("explanation")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order_index">Urutan</Label>
        <Input id="order_index" type="number" {...register("order_index", { valueAsNumber: true })} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Contoh Kalimat
      </Button>
    </form>
  );
}
