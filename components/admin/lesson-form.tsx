"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lessonFormSchema, type LessonFormValues } from "@/lib/validations/admin";
import { upsertLessonAction } from "@/lib/actions/admin";
import type { Lesson, Unit } from "@/types/database";

export function LessonForm({
  lesson,
  units,
  onSuccess,
}: {
  lesson?: Lesson;
  units: (Unit & { level: { cefr_code: string } })[];
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      unit_id: lesson?.unit_id ?? units[0]?.id ?? "",
      title: lesson?.title ?? "",
      slug: lesson?.slug ?? "",
      description: lesson?.description ?? "",
      learning_objectives: lesson?.learning_objectives ?? [],
      explanation: lesson?.explanation ?? "",
      grammar_notes: lesson?.grammar_notes ?? "",
      common_mistakes: lesson?.common_mistakes ?? "",
      estimated_minutes: lesson?.estimated_minutes ?? 10,
      xp_reward: lesson?.xp_reward ?? 20,
      order_index: lesson?.order_index ?? 0,
      force_unlocked: lesson?.force_unlocked ?? false,
      is_published: lesson?.is_published ?? false,
    },
  });

  const values = useWatch({ control });

  async function onSubmit(formValues: LessonFormValues) {
    const result = await upsertLessonAction(lesson?.id ?? null, formValues);
    if (!result.success) {
      toast.error(result.message ?? "Gagal menyimpan pelajaran.");
      return;
    }
    toast.success(result.message ?? "Pelajaran berhasil disimpan.");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="unit_id">Unit</Label>
        <Select value={values.unit_id} onValueChange={(v) => v && setValue("unit_id", v)}>
          <SelectTrigger id="unit_id" className="w-full">
            <SelectValue placeholder="Pilih unit" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                {unit.level.cefr_code} — {unit.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.unit_id && <p className="text-destructive text-sm">{errors.unit_id.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input id="title" {...register("title")} aria-invalid={!!errors.title} />
        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register("slug")} aria-invalid={!!errors.slug} />
        {errors.slug && <p className="text-destructive text-sm">{errors.slug.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Singkat</Label>
        <Textarea id="description" rows={2} {...register("description")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learning_objectives">Tujuan Pembelajaran (satu per baris)</Label>
        <Textarea
          id="learning_objectives"
          rows={3}
          value={values.learning_objectives?.join("\n") ?? ""}
          onChange={(e) =>
            setValue(
              "learning_objectives",
              e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Penjelasan (Bahasa Indonesia)</Label>
        <Textarea id="explanation" rows={5} {...register("explanation")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="grammar_notes">Catatan Tata Bahasa</Label>
        <Textarea id="grammar_notes" rows={3} {...register("grammar_notes")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="common_mistakes">Kesalahan Umum</Label>
        <Textarea id="common_mistakes" rows={3} {...register("common_mistakes")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="estimated_minutes">Estimasi (menit)</Label>
          <Input
            id="estimated_minutes"
            type="number"
            {...register("estimated_minutes", { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="xp_reward">XP</Label>
          <Input id="xp_reward" type="number" {...register("xp_reward", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order_index">Urutan</Label>
          <Input
            id="order_index"
            type="number"
            {...register("order_index", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="force_unlocked">Buka Paksa</Label>
        <Switch
          id="force_unlocked"
          checked={values.force_unlocked}
          onCheckedChange={(c) => setValue("force_unlocked", c)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="is_published">Publikasikan</Label>
        <Switch
          id="is_published"
          checked={values.is_published}
          onCheckedChange={(c) => setValue("is_published", c)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Pelajaran
      </Button>
    </form>
  );
}
