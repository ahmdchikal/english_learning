import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/common/page-container";

export default function AdminLoading() {
  return (
    <PageContainer>
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="mb-4 h-9 w-40" />
      <Skeleton className="h-96 rounded-2xl" />
    </PageContainer>
  );
}
