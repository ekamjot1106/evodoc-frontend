import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDoctorAppointments() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
      <div className="grid gap-4 xl:grid-cols-2">
        <Skeleton className="h-52 rounded-2xl" />
        <Skeleton className="h-52 rounded-2xl" />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Skeleton className="h-52 rounded-2xl" />
        <Skeleton className="h-52 rounded-2xl" />
      </div>
    </div>
  );
}

