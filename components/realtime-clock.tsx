"use client";

import { Clock3 } from "lucide-react";
import { useCurrentTime } from "@/hooks/use-current-time";

export function RealtimeClock() {
  const now = useCurrentTime();

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-2 text-sm text-muted-foreground shadow-soft">
      <Clock3 className="h-4 w-4" />
      <span>
        {now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric"
        })}
      </span>
      <span className="font-semibold text-foreground">
        {now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })}
      </span>
    </div>
  );
}

