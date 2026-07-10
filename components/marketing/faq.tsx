import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Apakah EnglishPath benar-benar gratis?",
    answer:
      "Ya. Semua fitur utama — pelajaran, kuis, latihan berbicara, dan pelacakan progres — dapat digunakan tanpa biaya.",
  },
  {
    question: "Apakah saya harus mengerjakan tes penempatan?",
    answer:
      "Tidak wajib. Tes penempatan bersifat opsional dan hanya memberikan rekomendasi awal. Anda tetap bisa mulai dari level Pre-A1 kapan saja.",
  },
  {
    question: "Apakah latihan berbicara memerlukan aplikasi tambahan?",
    answer:
      "Tidak. Latihan berbicara menggunakan fitur pengenalan suara langsung dari peramban Anda. Jika peramban Anda tidak mendukungnya, kami akan menampilkan pemberitahuan yang jelas.",
  },
  {
    question: "Bagaimana cara kerja sistem level dan penguncian materi?",
    answer:
      "Pelajaran terbuka secara berurutan. Level selanjutnya terbuka setelah Anda menyelesaikan minimal 80% pelajaran pada level sebelumnya dengan rata-rata skor kuis minimal 70.",
  },
  {
    question: "Apakah progres belajar saya tersimpan?",
    answer:
      "Ya. Setelah Anda mendaftar dan masuk, seluruh progres, XP, streak, dan skor kuis Anda tersimpan secara otomatis.",
  },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pertanyaan Umum</h2>
        <p className="mt-3 text-muted-foreground">
          Masih ada pertanyaan? Berikut jawaban untuk pertanyaan yang paling sering diajukan.
        </p>
      </div>

      <Accordion className="mt-10">
        {FAQS.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
