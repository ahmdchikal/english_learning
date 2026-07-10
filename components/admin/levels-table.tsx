"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormDialog } from "@/components/admin/form-dialog";
import { LevelForm } from "@/components/admin/level-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteLevelAction, togglePublishAction } from "@/lib/actions/admin";
import type { Level } from "@/types/database";

export function LevelsTable({ levels }: { levels: Level[] }) {
  const router = useRouter();

  function refresh() {
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <FormDialog trigger={<Button><Plus className="size-4" />Tambah Level</Button>} title="Tambah Level Baru">
          {(close) => <LevelForm onSuccess={() => { close(); refresh(); }} />}
        </FormDialog>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Urutan</TableHead>
              <TableHead>CEFR</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Publikasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {levels.map((level) => (
              <TableRow key={level.id}>
                <TableCell>{level.order_index}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{level.cefr_code}</Badge>
                </TableCell>
                <TableCell className="font-medium">{level.title}</TableCell>
                <TableCell className="text-muted-foreground">{level.slug}</TableCell>
                <TableCell>
                  <Switch
                    checked={level.is_published}
                    onCheckedChange={async (checked) => {
                      const result = await togglePublishAction("levels", level.id, checked);
                      if (!result.success) toast.error(result.message);
                      refresh();
                    }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <FormDialog
                      trigger={
                        <Button size="icon-sm" variant="ghost">
                          <Pencil className="size-4" />
                        </Button>
                      }
                      title="Edit Level"
                    >
                      {(close) => <LevelForm level={level} onSuccess={() => { close(); refresh(); }} />}
                    </FormDialog>
                    <ConfirmDialog
                      trigger={
                        <Button size="icon-sm" variant="ghost">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      }
                      title={`Hapus level "${level.title}"?`}
                      description="Semua unit dan pelajaran di dalam level ini juga akan terhapus. Tindakan ini tidak dapat dibatalkan."
                      onConfirm={async () => {
                        const result = await deleteLevelAction(level.id);
                        if (!result.success) {
                          toast.error(result.message);
                          return;
                        }
                        toast.success(result.message);
                        refresh();
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
