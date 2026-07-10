"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormDialog } from "@/components/admin/form-dialog";
import { LessonForm } from "@/components/admin/lesson-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteLessonAction, togglePublishAction } from "@/lib/actions/admin";
import type { Lesson, Unit } from "@/types/database";

export function LessonsTable({
  lessons,
  units,
}: {
  lessons: (Lesson & { unit: Pick<Unit, "id" | "title"> })[];
  units: (Unit & { level: { cefr_code: string } })[];
}) {
  const router = useRouter();
  const refresh = () => router.refresh();
  const [search, setSearch] = useState("");

  const filtered = lessons.filter((lesson) => lesson.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pelajaran..."
            className="pl-9"
          />
        </div>
        <FormDialog trigger={<Button><Plus className="size-4" />Tambah Pelajaran</Button>} title="Tambah Pelajaran Baru">
          {(close) => <LessonForm units={units} onSuccess={() => { close(); refresh(); }} />}
        </FormDialog>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Urutan</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>XP</TableHead>
              <TableHead>Publikasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.order_index}</TableCell>
                <TableCell className="font-medium">
                  <Link href={`/admin/lessons/${lesson.id}`} className="hover:underline">
                    {lesson.title}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{lesson.unit?.title}</TableCell>
                <TableCell>{lesson.xp_reward}</TableCell>
                <TableCell>
                  <Switch
                    checked={lesson.is_published}
                    onCheckedChange={async (checked) => {
                      const result = await togglePublishAction("lessons", lesson.id, checked);
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
                      title="Edit Pelajaran"
                    >
                      {(close) => (
                        <LessonForm lesson={lesson} units={units} onSuccess={() => { close(); refresh(); }} />
                      )}
                    </FormDialog>
                    <ConfirmDialog
                      trigger={
                        <Button size="icon-sm" variant="ghost">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      }
                      title={`Hapus pelajaran "${lesson.title}"?`}
                      description="Kosakata, contoh kalimat, dan soal pada pelajaran ini juga akan terhapus."
                      onConfirm={async () => {
                        const result = await deleteLessonAction(lesson.id);
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
