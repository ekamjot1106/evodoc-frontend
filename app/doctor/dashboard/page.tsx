"use client";

import Link from "next/link";
import {
  Bell,
  CalendarClock,
  CalendarDays,
  CircleAlert,
  CreditCard,
  FileText,
  UserRound
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { notifications, appointments, doctors, getAppointmentViews } from "@/data/mock-data";
import {
  chartDataFromAppointments,
  getThisWeekAppointments,
  getTodayAppointments
} from "@/lib/healthcare";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { RealtimeClock } from "@/components/realtime-clock";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activeDoctor = doctors[0];

export default function DoctorDashboardPage() {
  const doctorAppointments = appointments.filter((appointment) => appointment.doctorId === activeDoctor.id);
  const todayAppointments = getTodayAppointments(doctorAppointments);
  const weekAppointments = getThisWeekAppointments(doctorAppointments);
  const chartData = chartDataFromAppointments(doctorAppointments);

  const recentPatients = getAppointmentViews(doctorAppointments)
    .toSorted((a, b) => +new Date(b.startsAt) - +new Date(a.startsAt))
    .filter((item, index, source) => source.findIndex((current) => current.patientId === item.patientId) === index)
    .slice(0, 5);

  const weekRevenue = weekAppointments
    .filter((appointment) => appointment.status !== "Cancelled")
    .reduce((sum, appointment) => sum + appointment.fee, 0);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Doctor Dashboard"
        description="Clinical overview for appointments, patient follow-ups, and weekly performance."
        actions={<RealtimeClock />}
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Card className="rounded-2xl border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-primary">Doctor Profile</p>
              <h2 className="mt-1 text-2xl font-semibold">{activeDoctor.name}</h2>
              <p className="text-sm text-muted-foreground">
                {activeDoctor.specialty} | {activeDoctor.yearsExperience} years experience
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{activeDoctor.email}</p>
            </div>
            <Badge className="w-fit">In Clinic Today</Badge>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((note) => (
              <div key={note.id} className="rounded-xl border border-border/70 bg-background/70 p-3">
                <p className="text-sm font-semibold">{note.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{note.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Appointments" value={todayAppointments.length} icon={CalendarClock} />
        <StatCard label="This Week" value={weekAppointments.length} icon={CalendarDays} trend="Focused schedule" />
        <StatCard label="Recent Patients" value={recentPatients.length} icon={UserRound} trend="Continuity improving" />
        <StatCard
          label="Week Revenue"
          value={formatCurrency(weekRevenue)}
          icon={CreditCard}
          trend="Booked value"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Revenue & Appointments Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: 6, right: 6, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.35} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" orientation="right" hide />
                <Tooltip
                  cursor={{ fill: "rgba(148, 163, 184, 0.15)" }}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                />
                <Bar yAxisId="left" dataKey="appointments" radius={[10, 10, 0, 0]} fill="#2563eb" />
                <Bar yAxisId="right" dataKey="revenue" radius={[10, 10, 0, 0]} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPatients.map((patient) => (
              <Link
                key={patient.patientId}
                href={`/doctor/patient/${patient.patientId}`}
                className="flex items-center justify-between rounded-xl border border-border/70 p-3 transition hover:border-primary/40 hover:bg-accent"
              >
                <div>
                  <p className="text-sm font-semibold">{patient.patientName}</p>
                  <p className="text-xs text-muted-foreground">Last visit: {formatDate(patient.startsAt)}</p>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href="/doctor/appointments">View all appointments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-amber-500/20 bg-amber-50/60 dark:bg-amber-500/10">
        <CardContent className="flex items-start gap-3 p-4">
          <CircleAlert className="mt-0.5 h-4 w-4 text-amber-600" />
          <p className="text-sm text-amber-700 dark:text-amber-200">
            2 follow-up patients are outside target response window. Review upcoming appointment notes for
            high-priority cases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

