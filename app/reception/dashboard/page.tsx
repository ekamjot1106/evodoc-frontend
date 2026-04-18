"use client";

import Link from "next/link";
import { CalendarCheck2, CalendarPlus2, Clock3, UserPlus2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { appointments, getAppointmentViews } from "@/data/mock-data";
import { getTodayAppointments } from "@/lib/healthcare";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { RealtimeClock } from "@/components/realtime-clock";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";

export default function ReceptionDashboardPage() {
  const todayAppointments = getTodayAppointments(appointments);
  const newPatientsToday = todayAppointments.filter((item) => item.isNewPatient).length;
  const cancelledToday = todayAppointments.filter((item) => item.status === "Cancelled").length;
  const recentBookings = getAppointmentViews()
    .toSorted((a, b) => +new Date(b.startsAt) - +new Date(a.startsAt))
    .slice(0, 6);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Reception Dashboard"
        description="Monitor front-desk flow, registrations, and appointment health in real time."
        actions={<RealtimeClock />}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="rounded-2xl border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-primary">Welcome back, Olivia</p>
              <h2 className="text-2xl font-semibold">Front desk is running smoothly today</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {todayAppointments.length} appointments scheduled with {cancelledToday} cancellations.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="rounded-xl">
                <Link href="/reception/patient-intake">
                  <UserPlus2 className="mr-2 h-4 w-4" />
                  New Intake
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link href="/reception/appointments">
                  <CalendarPlus2 className="mr-2 h-4 w-4" />
                  Register Appointment
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today's Appointments"
          value={todayAppointments.length}
          icon={CalendarCheck2}
          trend="+12% vs yesterday"
        />
        <StatCard label="New Patients" value={newPatientsToday} icon={UserPlus2} trend="+3 since morning" />
        <StatCard
          label="Cancelled"
          value={cancelledToday}
          icon={XCircle}
          trend="Needs follow-up"
          positive={false}
        />
        <StatCard label="Average Wait" value="14 min" icon={Clock3} trend="-4 min this week" />
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest appointment activity across all departments.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            rows={recentBookings}
            columns={[
              {
                key: "patient",
                title: "Patient",
                render: (row) => (
                  <div>
                    <p className="font-medium">{row.patientName}</p>
                    <p className="text-xs text-muted-foreground">{row.id}</p>
                  </div>
                )
              },
              {
                key: "doctor",
                title: "Doctor",
                render: (row) => (
                  <div>
                    <p className="font-medium">{row.doctorName}</p>
                    <p className="text-xs text-muted-foreground">{row.doctorSpecialty}</p>
                  </div>
                )
              },
              {
                key: "datetime",
                title: "Date & Time",
                render: (row) => (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(row.startsAt)} at {formatTime(row.startsAt)}
                  </p>
                )
              },
              {
                key: "status",
                title: "Status",
                className: "w-[140px]",
                render: (row) => <StatusBadge status={row.status} />
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

