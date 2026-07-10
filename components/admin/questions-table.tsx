"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormDialog } from "@/components/admin/form-dialog";
import { QuestionForm } from "@/components/admin/question-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteQuestionAction } from "@/lib/actions/admin";
import type { Lesson, Question, QuestionOption } from "@/types/database";

export function QuestionsTable({
  questions,
  lessons,
}: {
  questions: (Question & {
    options: QuestionOption[];
    lesson: Pick<Lesson, "id" | "title"> | null;
  })[];
  lessons: Pick<Lesson, "id" | "title">[];
}) {
  const router = useRouter();
  const refresh = () => router.refresh();
  const [search, setSearch] = useState("");

  const filtered = questions.filter((q) => q.prompt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari soal..."
            className="pl-9"
          />
        </div>
        <FormDialog
          trigger={
            <Button>
              <Plus className="size-4" />
              Tambah Soal
            </Button>
          }
          title="Tambah Soal Baru"
        >
          {(close) => (
            <QuestionForm
              lessons={lessons}
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
              <TableHead>Tipe</TableHead>
              <TableHead>Pertanyaan</TableHead>
              <TableHead>Pelajaran</TableHead>
              <TableHead>Kesulitan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((question) => (
              <TableRow key={question.id}>
                <TableCell>
                  <Badge variant="secondary">{question.type}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate font-medium">{question.prompt}</TableCell>
                <TableCell className="text-muted-foreground">
                  {question.is_placement_question
                    ? "Tes Penempatan"
                    : (question.lesson?.title ?? "-")}
                </TableCell>
                <TableCell className="text-muted-foreground">{question.difficulty}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <FormDialog
                      trigger={
                        <Button size="icon-sm" variant="ghost">
                          <Pencil className="size-4" />
                        </Button>
                      }
                      title="Edit Soal"
                    >
                      {(close) => (
                        <QuestionForm
                          question={question}
                          lessons={lessons}
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
                      title="Hapus soal ini?"
                      description="Tindakan ini tidak dapat dibatalkan."
                      onConfirm={async () => {
                        const result = await deleteQuestionAction(question.id);
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
