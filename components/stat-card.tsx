import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  positive?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, positive = true }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Card className="h-full rounded-2xl border-border/70 bg-white/80 dark:bg-slate-900/70">
        <CardContent className="flex h-full items-start justify-between gap-4 p-5">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
            {trend ? (
              <p
                className={cn(
                  "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                  positive ? "text-emerald-600" : "text-destructive"
                )}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                {trend}
              </p>
            ) : null}
          </div>
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

