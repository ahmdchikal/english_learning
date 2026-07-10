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
import { unitFormSchema, type UnitFormValues } from "@/lib/validations/admin";
import { upsertUnitAction } from "@/lib/actions/admin";
import type { Level, Unit } from "@/types/database";

export function UnitForm({
  unit,
  levels,
  onSuccess,
}: {
  unit?: Unit;
  levels: Level[];
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UnitFormValues>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      level_id: unit?.level_id ?? levels[0]?.id ?? "",
      title: unit?.title ?? "",
      slug: unit?.slug ?? "",
      description: unit?.description ?? "",
      order_index: unit?.order_index ?? 0,
      force_unlocked: unit?.force_unlocked ?? false,
      is_published: unit?.is_published ?? false,
    },
  });

  const values = useWatch({ control });

  async function onSubmit(formValues: UnitFormValues) {
    const result = await upsertUnitAction(unit?.id ?? null, formValues);
    if (!result.success) {
      toast.error(result.message ?? "Gagal menyimpan unit.");
      return;
    }
    toast.success(result.message ?? "Unit berhasil disimpan.");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="level_id">Level</Label>
        <Select value={values.level_id} onValueChange={(v) => v && setValue("level_id", v)}>
          <SelectTrigger id="level_id" className="w-full">
            <SelectValue placeholder="Pilih level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level.id} value={level.id}>
                {level.cefr_code} — {level.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.level_id && <p className="text-destructive text-sm">{errors.level_id.message}</p>}
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

      <div className="space-y-2">
        <Label htmlFor="order_index">Urutan</Label>
        <Input
          id="order_index"
          type="number"
          {...register("order_index", { valueAsNumber: true })}
        />
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
        Simpan Unit
      </Button>
    </form>
  );
}
