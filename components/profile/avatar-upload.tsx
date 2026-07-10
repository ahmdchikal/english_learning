"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { uploadAvatarAction } from "@/lib/actions/profile";
import { AVATAR_ALLOWED_TYPES, AVATAR_MAX_SIZE_BYTES } from "@/lib/validations/profile";

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "U"
  );
}

export function AvatarUpload({ avatarUrl, fullName }: { avatarUrl: string | null; fullName: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(avatarUrl);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
      toast.error("Format file harus PNG, JPEG, atau WebP.");
      return;
    }
    if (file.size > AVATAR_MAX_SIZE_BYTES) {
      toast.error("Ukuran file maksimal 2MB.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.set("avatar", file);
    const result = await uploadAvatarAction(formData);
    setUploading(false);

    if (!result.success) {
      toast.error(result.message ?? "Gagal mengunggah foto profil.");
      setPreview(avatarUrl);
      return;
    }
    toast.success(result.message ?? "Foto profil berhasil diperbarui.");
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar className="size-24">
          <AvatarImage src={preview ?? undefined} alt={fullName} />
          <AvatarFallback className="bg-indigo-600 text-2xl text-white">{getInitials(fullName)}</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          size="icon-sm"
          className="absolute -bottom-1 -right-1 rounded-full"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label="Unggah foto profil"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <p className="text-xs text-muted-foreground">PNG, JPEG, atau WebP. Maksimal 2MB.</p>
    </div>
  );
}
