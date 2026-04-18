import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingReceptionAppointments() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="h-[450px] rounded-2xl" />
      <Skeleton className="h-[380px] rounded-2xl" />
    </div>
  );
}

