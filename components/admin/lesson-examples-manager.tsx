"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/admin/form-dialog";
import { LessonExampleForm } from "@/components/admin/lesson-example-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteLessonExampleAction } from "@/lib/actions/admin";
import type { LessonExample } from "@/types/database";

export function LessonExamplesManager({
  lessonId,
  examples,
}: {
  lessonId: string;
  examples: LessonExample[];
}) {
  const router = useRouter();
  const refresh = () => router.refresh();

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <FormDialog
          trigger={
            <Button size="sm">
              <Plus className="size-4" />
              Tambah Contoh
            </Button>
          }
          title="Tambah Contoh Kalimat"
        >
          {(close) => (
            <LessonExampleForm
              lessonId={lessonId}
              onSuccess={() => {
                close();
                refresh();
              }}
            />
          )}
        </FormDialog>
      </div>
      {examples.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Belum ada contoh kalimat untuk pelajaran ini.
        </p>
      ) : (
        <ul className="space-y-2">
          {examples.map((example) => (
            <li
              key={example.id}
              className="flex items-center justify-between rounded-xl border p-3"
            >
              <div>
                <p className="font-medium">{example.english_text}</p>
                <p className="text-muted-foreground text-xs">{example.indonesian_text}</p>
              </div>
              <div className="flex gap-1">
                <FormDialog
                  trigger={
                    <Button size="icon-sm" variant="ghost">
                      <Pencil className="size-4" />
                    </Button>
                  }
                  title="Edit Contoh Kalimat"
                >
                  {(close) => (
                    <LessonExampleForm
                      lessonId={lessonId}
                      item={example}
                      onSuccess={() => {
                        close();
                        refresh();
                      }}
                    />
                  )}
                </FormDialog>
                <ConfirmDialog
                  trigger={
                    <Button size="icon-sm" variant="ghost">
                      <Trash2 className="text-destructive size-4" />
                    </Button>
                  }
                  title="Hapus contoh kalimat ini?"
                  description="Tindakan ini tidak dapat dibatalkan."
                  onConfirm={async () => {
                    const result = await deleteLessonExampleAction(example.id);
                    if (!result.success) {
                      toast.error(result.message);
                      return;
                    }
                    toast.success(result.message);
                    refresh();
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
