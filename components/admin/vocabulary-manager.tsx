"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/admin/form-dialog";
import { VocabularyForm } from "@/components/admin/vocabulary-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteVocabularyAction } from "@/lib/actions/admin";
import type { Vocabulary } from "@/types/database";

export function VocabularyManager({
  lessonId,
  vocabulary,
}: {
  lessonId: string;
  vocabulary: Vocabulary[];
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
              Tambah Kosakata
            </Button>
          }
          title="Tambah Kosakata"
        >
          {(close) => (
            <VocabularyForm
              lessonId={lessonId}
              onSuccess={() => {
                close();
                refresh();
              }}
            />
          )}
        </FormDialog>
      </div>
      {vocabulary.length === 0 ? (
        <p className="text-muted-foreground text-sm">Belum ada kosakata untuk pelajaran ini.</p>
      ) : (
        <ul className="space-y-2">
          {vocabulary.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-xl border p-3">
              <div>
                <p className="font-medium">
                  {item.english_word}{" "}
                  <span className="text-muted-foreground">— {item.indonesian_meaning}</span>
                </p>
                <p className="text-muted-foreground text-xs">{item.example_sentence}</p>
              </div>
              <div className="flex gap-1">
                <FormDialog
                  trigger={
                    <Button size="icon-sm" variant="ghost">
                      <Pencil className="size-4" />
                    </Button>
                  }
                  title="Edit Kosakata"
                >
                  {(close) => (
                    <VocabularyForm
                      lessonId={lessonId}
                      item={item}
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
                  title="Hapus kosakata ini?"
                  description={`"${item.english_word}" akan dihapus secara permanen.`}
                  onConfirm={async () => {
                    const result = await deleteVocabularyAction(item.id);
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
