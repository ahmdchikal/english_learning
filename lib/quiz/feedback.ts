export function getMotivationalMessage(score: number, passed: boolean): string {
  if (score === 100) return "Sempurna! Kamu menguasai pelajaran ini dengan luar biasa!";
  if (passed && score >= 90) return "Kerja bagus! Hasil yang sangat memuaskan.";
  if (passed) return "Selamat, kamu lulus! Terus tingkatkan pemahamanmu.";
  if (score >= 50) return "Hampir berhasil! Pelajari kembali materinya dan coba lagi.";
  return "Jangan menyerah! Pelajari kembali materi lalu coba kuis ini lagi.";
}
