"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileSchema, type UpdateProfileValues } from "@/lib/validations/profile";
import { updateProfileAction } from "@/lib/actions/profile";

export function ProfileForm({ fullName, dailyGoalMinutes }: { fullName: string; dailyGoalMinutes: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { fullName, dailyGoalMinutes },
  });

  async function onSubmit(values: UpdateProfileValues) {
    const result = await updateProfileAction(values);
    if (!result.success) {
      toast.error(result.message ?? "Gagal memperbarui profil.");
      return;
    }
    toast.success(result.message ?? "Profil berhasil diperbarui.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="fullName">Nama Lengkap</Label>
        <Input id="fullName" aria-invalid={!!errors.fullName} {...register("fullName")} />
        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dailyGoalMinutes">Target Belajar Harian (menit)</Label>
        <Input
          id="dailyGoalMinutes"
          type="number"
          min={5}
          max={240}
          aria-invalid={!!errors.dailyGoalMinutes}
          {...register("dailyGoalMinutes", { valueAsNumber: true })}
        />
        {errors.dailyGoalMinutes && (
          <p className="text-sm text-destructive">{errors.dailyGoalMinutes.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Perubahan
      </Button>
    </form>
  );
}
