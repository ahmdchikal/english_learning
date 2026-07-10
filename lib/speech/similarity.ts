/**
 * Simple word-level similarity scoring for speaking practice. Not a
 * substitute for a real pronunciation-scoring model — just an accessible,
 * zero-cost heuristic based on comparing the recognized transcript against
 * the target sentence word by word (Levenshtein distance per word, plus a
 * sequence-alignment pass so extra/missing words don't wreck the score).
 */

function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9']/g, "");
}

function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map(normalizeWord)
    .filter((word) => word.length > 0);
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }
  return matrix[rows - 1][cols - 1];
}

function wordsAreClose(a: string, b: string): boolean {
  if (a === b) return true;
  const distance = levenshtein(a, b);
  const threshold = Math.max(1, Math.floor(Math.max(a.length, b.length) * 0.3));
  return distance <= threshold;
}

export interface WordComparisonResult {
  word: string;
  correct: boolean;
}

export interface SpeakingScoreResult {
  score: number;
  targetWords: WordComparisonResult[];
  feedback: string;
}

export function scoreSpeakingAttempt(target: string, spoken: string): SpeakingScoreResult {
  const targetTokens = tokenize(target);
  const spokenTokens = tokenize(spoken);

  if (targetTokens.length === 0) {
    return { score: 0, targetWords: [], feedback: "Tidak ada kalimat target untuk dibandingkan." };
  }

  const usedSpokenIndexes = new Set<number>();
  const targetWords: WordComparisonResult[] = targetTokens.map((targetWord) => {
    let matchIndex = -1;
    for (let i = 0; i < spokenTokens.length; i++) {
      if (usedSpokenIndexes.has(i)) continue;
      if (wordsAreClose(targetWord, spokenTokens[i])) {
        matchIndex = i;
        break;
      }
    }
    if (matchIndex >= 0) {
      usedSpokenIndexes.add(matchIndex);
      return { word: targetWord, correct: true };
    }
    return { word: targetWord, correct: false };
  });

  const correctCount = targetWords.filter((w) => w.correct).length;
  const score = Math.round((correctCount / targetTokens.length) * 100);

  let feedback: string;
  if (score >= 90) {
    feedback = "Pengucapan sangat baik!";
  } else if (score >= 70) {
    feedback = "Usaha yang bagus. Coba sekali lagi untuk hasil lebih baik.";
  } else {
    feedback = "Perhatikan pengucapan kata-kata yang ditandai di bawah ini.";
  }

  return { score, targetWords, feedback };
}
