import { Skeleton } from "@/components/ui/skeleton";

export function AboutContentSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-12 w-full max-w-md" />
      <Skeleton className="h-20 w-full max-w-2xl" />
      <div className="space-y-4 pt-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-16 w-full max-w-2xl" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-16 w-full max-w-2xl" />
      </div>
    </div>
  );
}

export function AboutImageSkeleton() {
  return <Skeleton className="aspect-[5/4] w-full rounded-md" aria-hidden="true" />;
}
