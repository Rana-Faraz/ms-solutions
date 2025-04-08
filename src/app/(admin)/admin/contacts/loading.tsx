import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
      </div>

      <div className="rounded-md border">
        <div className="border-b p-4">
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-8 w-[300px]" />
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="ml-auto h-8 w-8" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t px-4 py-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
