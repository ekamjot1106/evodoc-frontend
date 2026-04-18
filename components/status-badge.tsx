import type { AppointmentStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "Completed") {
    return <Badge variant="success">Completed</Badge>;
  }

  if (status === "Cancelled") {
    return <Badge variant="destructive">Cancelled</Badge>;
  }

  return <Badge variant="default">Scheduled</Badge>;
}

