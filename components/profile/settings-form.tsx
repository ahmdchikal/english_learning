"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Loader2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateSettingsSchema, type UpdateSettingsValues } from "@/lib/validations/profile";
import { updateSettingsAction } from "@/lib/actions/profile";
import type { ThemePreference } from "@/types/database";

export function SettingsForm({
  soundEnabled,
  ttsSpeed,
  theme,
}: {
  soundEnabled: boolean;
  ttsSpeed: number;
  theme: ThemePreference;
}) {
  const { setTheme } = useTheme();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateSettingsValues>({
    resolver: zodResolver(updateSettingsSchema),
    defaultValues: { soundEnabled, ttsSpeed, theme },
  });

  const values = useWatch({ control });

  async function onSubmit(formValues: UpdateSettingsValues) {
    const result = await updateSettingsAction(formValues);
    if (!result.success) {
      toast.error(result.message ?? "Gagal menyimpan pengaturan.");
      return;
    }
    setTheme(formValues.theme);
    toast.success(result.message ?? "Pengaturan berhasil disimpan.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="soundEnabled">Suara Aplikasi</Label>
          <p className="text-sm text-muted-foreground">Aktifkan efek suara dan audio pengucapan.</p>
        </div>
        <Switch
          id="soundEnabled"
          checked={values.soundEnabled ?? soundEnabled}
          onCheckedChange={(checked) => setValue("soundEnabled", checked)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="ttsSpeed" className="flex items-center gap-1.5">
            <Volume2 className="size-4" />
            Kecepatan Suara Text-to-Speech
          </Label>
          <span className="text-sm text-muted-foreground">{(values.ttsSpeed ?? ttsSpeed).toFixed(1)}x</span>
        </div>
        <Slider
          id="ttsSpeed"
          className="mt-2"
          min={0.5}
          max={1.5}
          step={0.1}
          value={[values.ttsSpeed ?? ttsSpeed]}
          onValueChange={(v) => setValue("ttsSpeed", Array.isArray(v) ? v[0] : v)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="theme">Tema Tampilan</Label>
        <Select value={values.theme ?? theme} onValueChange={(v) => setValue("theme", v as ThemePreference)}>
          <SelectTrigger id="theme" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Terang</SelectItem>
            <SelectItem value="dark">Gelap</SelectItem>
            <SelectItem value="system">Ikuti Sistem</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Pengaturan
      </Button>
    </form>
  );
}
