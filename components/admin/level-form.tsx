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
import { levelFormSchema, type LevelFormValues } from "@/lib/validations/admin";
import { upsertLevelAction } from "@/lib/actions/admin";
import type { Level } from "@/types/database";

export function LevelForm({ level, onSuccess }: { level?: Level; onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LevelFormValues>({
    resolver: zodResolver(levelFormSchema),
    defaultValues: {
      name: level?.name ?? "",
      slug: level?.slug ?? "",
      cefr_code: level?.cefr_code ?? "",
      title: level?.title ?? "",
      description: level?.description ?? "",
      order_index: level?.order_index ?? 0,
      required_xp: level?.required_xp ?? 0,
      force_unlocked: level?.force_unlocked ?? false,
      is_published: level?.is_published ?? false,
    },
  });

  const values = useWatch({ control });

  async function onSubmit(formValues: LevelFormValues) {
    const result = await upsertLevelAction(level?.id ?? null, formValues);
    if (!result.success) {
      toast.error(result.message ?? "Gagal menyimpan level.");
      return;
    }
    toast.success(result.message ?? "Level berhasil disimpan.");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cefr_code">Kode CEFR</Label>
          <Input id="cefr_code" {...register("cefr_code")} aria-invalid={!!errors.cefr_code} />
          {errors.cefr_code && (
            <p className="text-destructive text-sm">{errors.cefr_code.message}</p>
          )}
        </div>
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
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" rows={3} {...register("description")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order_index">Urutan</Label>
          <Input
            id="order_index"
            type="number"
            {...register("order_index", { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="required_xp">XP Minimum</Label>
          <Input
            id="required_xp"
            type="number"
            {...register("required_xp", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="force_unlocked">Buka Paksa (lewati aturan kunci)</Label>
        <Switch
          id="force_unlocked"
          checked={values.force_unlocked}
          onCheckedChange={(checked) => setValue("force_unlocked", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="is_published">Publikasikan</Label>
        <Switch
          id="is_published"
          checked={values.is_published}
          onCheckedChange={(checked) => setValue("is_published", checked)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Level
      </Button>
    </form>
  );
}
