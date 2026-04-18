"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Stethoscope, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-grid [background-size:20px_20px] opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <Card className="rounded-3xl border-border/60 bg-white/85 shadow-card backdrop-blur dark:bg-slate-900/75">
            <CardHeader>
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Activity className="h-3.5 w-3.5" />
                Healthcare Operations Suite
              </p>
              <CardTitle className="text-4xl">EvoDoc</CardTitle>
              <CardDescription className="max-w-lg text-base">
                Unified reception and clinical workflows for high-volume healthcare teams. Built for speed,
                clarity, and patient-safe coordination.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="font-semibold text-foreground">Real-time Operations</p>
                <p className="mt-2">Track live schedules, cancellations, and intake updates with confidence.</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="font-semibold text-foreground">Clinical Context</p>
                <p className="mt-2">Access patient records and visit notes in a focused, doctor-friendly view.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/60 bg-white/90 shadow-card dark:bg-slate-900/80">
            <CardHeader>
              <CardTitle>Sign in to continue</CardTitle>
              <CardDescription>Choose a role to open the corresponding EvoDoc workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="h-12 w-full justify-start rounded-xl text-base">
                <Link href="/reception/dashboard">
                  <UserCog className="mr-2 h-5 w-5" />
                  Receptionist / Nurse Portal
                </Link>
              </Button>
              <Button asChild variant="secondary" className="h-12 w-full justify-start rounded-xl text-base">
                <Link href="/doctor/dashboard">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Doctor Portal
                </Link>
              </Button>
              <p className="pt-2 text-xs text-muted-foreground">
                Demo access enabled. Authentication is intentionally mocked for frontend-only scope.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </main>
  );
}

