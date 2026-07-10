import { Progress } from "@/components/ui/progress";

export function QuizProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Soal {current} dari {total}
        </span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <Progress value={(current / total) * 100} indicatorClassName="bg-indigo-600" />
    </div>
  );
}
