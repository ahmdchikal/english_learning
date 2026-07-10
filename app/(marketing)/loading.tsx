import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Skeleton className="mx-auto h-10 w-72" />
      <Skeleton className="mx-auto mt-4 h-4 w-96" />
      <div className="mt-10 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
