import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDoctorPatientPage() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-72 rounded-2xl" />
      <Skeleton className="h-56 rounded-2xl" />
    </div>
  );
}

