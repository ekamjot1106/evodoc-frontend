"use client";

import Link from "next/link";
import { CalendarX2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { appointments, getAppointmentViews } from "@/data/mock-data";
import { useDebounce } from "@/hooks/use-debounce";
import { groupByUpcomingAndPast } from "@/lib/healthcare";
import { formatDate, formatTime } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";

const activeDoctorId = "doc-1";

export default function DoctorAppointmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "">("");
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    return getAppointmentViews(appointments)
      .filter((item) => item.doctorId === activeDoctorId)
      .filter((item) =>
        item.patientName.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
      )
      .filter((item) => (statusFilter ? item.status === statusFilter : true));
  }, [debouncedSearch, statusFilter]);

  const { upcoming, past } = useMemo(() => groupByUpcomingAndPast(filtered), [filtered]);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Doctor Appointments"
        description="Review upcoming and completed visits with quick access to patient records."
      />

      <Card className="rounded-2xl">
        <CardContent className="grid gap-3 p-4 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by patient name"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as AppointmentStatus | "")}
          >
            <option value="">All status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          <Badge variant="secondary">{upcoming.length}</Badge>
        </div>
        {upcoming.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title="No upcoming appointments"
            description="Newly scheduled visits will appear here when available."
          />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {upcoming.map((appointment) => (
              <Card key={appointment.id} className="rounded-2xl">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <p>Date: {formatDate(appointment.startsAt)}</p>
                    <p>Time: {formatTime(appointment.startsAt)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  <Button asChild className="rounded-xl">
                    <Link href={`/doctor/patient/${appointment.patientId}`}>Open Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Past Appointments</h2>
          <Badge variant="secondary">{past.length}</Badge>
        </div>
        {past.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title="No past appointments"
            description="Completed visits and historical records will show here."
          />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {past.map((appointment) => (
              <Card key={appointment.id} className="rounded-2xl">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <p>Date: {formatDate(appointment.startsAt)}</p>
                    <p>Time: {formatTime(appointment.startsAt)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href={`/doctor/patient/${appointment.patientId}`}>Open Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

