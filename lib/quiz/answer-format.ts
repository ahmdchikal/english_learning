import type { Question } from "@/types/database";

/**
 * Matching-type questions store their canonical answer as `left=right`
 * (e.g. "hello=halo"). The UI only asks the learner to fill in the right
 * side, so we reconstruct the full string before comparing/submitting.
 */
export function getMatchingLeftSide(correctAnswer: string): string {
  return correctAnswer.split("=")[0] ?? "";
}

function getMatchingRightSide(correctAnswer: string): string {
  return correctAnswer.split("=").slice(1).join("=") ?? "";
}

export function buildSubmissionValue(question: Pick<Question, "type" | "correct_answer">, rawValue: string): string {
  if (question.type === "matching") {
    return `${getMatchingLeftSide(question.correct_answer)}=${rawValue.trim()}`;
  }
  return rawValue;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function isAnswerCorrect(question: Pick<Question, "type" | "correct_answer">, rawValue: string): boolean {
  if (!rawValue) return false;

  if (question.type === "matching") {
    return normalize(rawValue) === normalize(getMatchingRightSide(question.correct_answer));
  }

  return normalize(buildSubmissionValue(question, rawValue)) === normalize(question.correct_answer);
}

/** Splits a scrambled-word prompt like "from / Indonesia / I / am" into tokens. */
export function parseScrambledWords(prompt: string): string[] {
  return prompt
    .split("/")
    .map((word) => word.trim())
    .filter(Boolean);
}
