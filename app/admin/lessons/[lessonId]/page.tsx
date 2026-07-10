import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/common/page-container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { VocabularyManager } from "@/components/admin/vocabulary-manager";
import { LessonExamplesManager } from "@/components/admin/lesson-examples-manager";
import { getAdminLessonDetail } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const detail = await getAdminLessonDetail(lessonId);
  return { title: detail ? `Kelola: ${detail.lesson.title}` : "Kelola Pelajaran" };
}

export default async function AdminLessonDetailPage({ params }: PageProps) {
  const { lessonId } = await params;
  const detail = await getAdminLessonDetail(lessonId);
  if (!detail) notFound();

  const { lesson, vocabulary, examples, questions } = detail;

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: "Panel Admin", href: "/admin" },
          { label: "Pelajaran", href: "/admin/lessons" },
          { label: lesson.title },
        ]}
        homeHref="/admin"
      />
      <h1 className="mb-1 text-2xl font-bold tracking-tight">{lesson.title}</h1>
      <p className="text-muted-foreground mb-6">
        Kelola kosakata dan contoh kalimat untuk pelajaran ini. Untuk mengubah judul, deskripsi,
        atau konten utama, gunakan tombol edit pada halaman daftar pelajaran.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
          <h2 className="mb-3 font-semibold">Kosakata ({vocabulary.length})</h2>
          <VocabularyManager lessonId={lesson.id} vocabulary={vocabulary} />
        </div>

        <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
          <h2 className="mb-3 font-semibold">Contoh Kalimat ({examples.length})</h2>
          <LessonExamplesManager lessonId={lesson.id} examples={examples} />
        </div>
      </div>

      <div className="bg-card mt-6 rounded-2xl border p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold">Soal ({questions.length})</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Kelola soal untuk pelajaran ini di halaman{" "}
          <Link
            href="/admin/questions"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Kelola Soal
          </Link>
          .
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          {questions.map((q) => (
            <li key={q.id} className="text-muted-foreground">
              {q.order_index + 1}. [{q.type}] {q.prompt}
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
}
