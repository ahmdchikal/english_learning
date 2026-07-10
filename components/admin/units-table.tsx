"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormDialog } from "@/components/admin/form-dialog";
import { UnitForm } from "@/components/admin/unit-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteUnitAction, togglePublishAction } from "@/lib/actions/admin";
import type { Level, Unit } from "@/types/database";

export function UnitsTable({
  units,
  levels,
}: {
  units: (Unit & { level: Pick<Level, "id" | "title" | "cefr_code"> })[];
  levels: Level[];
}) {
  const router = useRouter();
  const refresh = () => router.refresh();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <FormDialog
          trigger={
            <Button>
              <Plus className="size-4" />
              Tambah Unit
            </Button>
          }
          title="Tambah Unit Baru"
        >
          {(close) => (
            <UnitForm
              levels={levels}
              onSuccess={() => {
                close();
                refresh();
              }}
            />
          )}
        </FormDialog>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Level</TableHead>
              <TableHead>Urutan</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Publikasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>
                  <Badge variant="secondary">{unit.level.cefr_code}</Badge>
                </TableCell>
                <TableCell>{unit.order_index}</TableCell>
                <TableCell className="font-medium">{unit.title}</TableCell>
                <TableCell className="text-muted-foreground">{unit.slug}</TableCell>
                <TableCell>
                  <Switch
                    checked={unit.is_published}
                    onCheckedChange={async (checked) => {
                      const result = await togglePublishAction("units", unit.id, checked);
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
                      title="Edit Unit"
                    >
                      {(close) => (
                        <UnitForm
                          unit={unit}
                          levels={levels}
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
                      title={`Hapus unit "${unit.title}"?`}
                      description="Semua pelajaran di dalam unit ini juga akan terhapus. Tindakan ini tidak dapat dibatalkan."
                      onConfirm={async () => {
                        const result = await deleteUnitAction(unit.id);
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
