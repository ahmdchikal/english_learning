"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteAccountAction } from "@/lib/actions/profile";

export function DeleteAccountButton() {
  const router = useRouter();

  return (
    <ConfirmDialog
      trigger={
        <Button type="button" variant="destructive">
          <Trash2 className="size-4" />
          Hapus Akun
        </Button>
      }
      title="Hapus akun Anda?"
      description="Tindakan ini akan menghapus akun Anda secara permanen beserta seluruh progres belajar, XP, dan lencana. Tindakan ini tidak dapat dibatalkan."
      confirmLabel="Hapus Akun"
      onConfirm={async () => {
        const result = await deleteAccountAction();
        if (!result.success) {
          toast.error(result.message ?? "Gagal menghapus akun.");
          return;
        }
        toast.success("Akun berhasil dihapus.");
        router.push("/");
        router.refresh();
      }}
    />
  );
}
