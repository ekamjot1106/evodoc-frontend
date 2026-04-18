"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarRange,
  Download,
  Eye,
  FilePenLine,
  Filter,
  PlusCircle,
  Trash2,
  UserSearch
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { FormField } from "@/components/form-field";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { appointments, doctors, getAppointmentViews, patients } from "@/data/mock-data";
import { useDebounce } from "@/hooks/use-debounce";
import { exportAppointmentsToCsv, statusOrder } from "@/lib/csv";
import { formatDate, formatTime } from "@/lib/utils";
import {
  appointmentBookingSchema,
  type AppointmentBookingValues
} from "@/lib/validators";
import type { AppointmentStatus, AppointmentView } from "@/types";

const defaultValues: AppointmentBookingValues = {
  patientMode: "existing",
  patientId: "",
  newPatientName: "",
  newPatientPhone: "",
  doctorId: "",
  date: "",
  time: "",
  type: "General Consultation",
  notes: ""
};

export default function ReceptionAppointmentsPage() {
  const [rows, setRows] = useState<AppointmentView[]>(() => getAppointmentViews(appointments));
  const [patientSearch, setPatientSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "">("");
  const [pendingCancel, setPendingCancel] = useState<AppointmentView | null>(null);

  const debouncedTableSearch = useDebounce(tableSearch, 350);
  const debouncedPatientSearch = useDebounce(patientSearch, 250);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<AppointmentBookingValues>({
    resolver: zodResolver(appointmentBookingSchema),
    defaultValues
  });

  const watchedMode = watch("patientMode");
  const watchedDoctorId = watch("doctorId");
  const watchedDate = watch("date");

  const searchedPatients = useMemo(() => {
    const normalized = debouncedPatientSearch.toLowerCase();
    if (!normalized) {
      return patients;
    }

    return patients.filter((patient) => patient.fullName.toLowerCase().includes(normalized));
  }, [debouncedPatientSearch]);

  const availability = useMemo(() => {
    if (!watchedDoctorId || !watchedDate) {
      return null;
    }

    const doctorLoad = rows.filter((row) => {
      const day = new Date(row.startsAt).toISOString().slice(0, 10);
      return row.doctorId === watchedDoctorId && day === watchedDate && row.status === "Scheduled";
    }).length;

    if (doctorLoad <= 4) {
      return { label: "Available", className: "text-emerald-600" };
    }

    if (doctorLoad <= 7) {
      return { label: "Limited Slots", className: "text-amber-500" };
    }

    return { label: "High Load", className: "text-destructive" };
  }, [rows, watchedDate, watchedDoctorId]);

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) => {
        const matchesSearch = row.patientName
          .toLowerCase()
          .includes(debouncedTableSearch.toLowerCase());
        const matchesDoctor = doctorFilter ? row.doctorId === doctorFilter : true;
        const matchesDate = dateFilter
          ? new Date(row.startsAt).toISOString().slice(0, 10) === dateFilter
          : true;
        const matchesStatus = statusFilter ? row.status === statusFilter : true;

        return matchesSearch && matchesDoctor && matchesDate && matchesStatus;
      })
      .toSorted((a, b) => {
        const dateDiff = +new Date(b.startsAt) - +new Date(a.startsAt);
        if (dateDiff !== 0) {
          return dateDiff;
        }
        return statusOrder(a.status) - statusOrder(b.status);
      });
  }, [rows, debouncedTableSearch, doctorFilter, dateFilter, statusFilter]);

  const onSubmit = async (values: AppointmentBookingValues) => {
    await new Promise((resolve) => setTimeout(resolve, 450));

    const doctor = doctors.find((item) => item.id === values.doctorId);
    const existingPatient = patients.find((item) => item.id === values.patientId);
    const patientName =
      values.patientMode === "existing"
        ? existingPatient?.fullName ?? "Unknown patient"
        : values.newPatientName ?? "New patient";

    const startsAt = new Date(`${values.date}T${values.time}:00`).toISOString();

    const newRow: AppointmentView = {
      id: `apt-${Date.now()}`,
      patientId: existingPatient?.id ?? `new-${Date.now()}`,
      doctorId: values.doctorId,
      startsAt,
      status: "Scheduled",
      type: values.type,
      notes: values.notes ?? "",
      fee: 180,
      isNewPatient: values.patientMode === "new",
      patientName,
      doctorName: doctor?.name ?? "Unassigned doctor",
      doctorSpecialty: doctor?.specialty ?? "General"
    };

    setRows((current) => [newRow, ...current]);
    toast.success(`Appointment booked for ${patientName}`);
    reset(defaultValues);
    setPatientSearch("");
    setValue("patientMode", "existing");
  };

  const cancelAppointment = () => {
    if (!pendingCancel) {
      return;
    }

    setRows((current) =>
      current.map((appointment) =>
        appointment.id === pendingCancel.id ? { ...appointment, status: "Cancelled" } : appointment
      )
    );
    toast.success(`Cancelled appointment for ${pendingCancel.patientName}`);
    setPendingCancel(null);
  };

  return (
    <div className="space-y-7">
      <PageHeader
        title="Appointments"
        description="Register, track, and manage patient appointments with complete front-desk visibility."
        actions={
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => exportAppointmentsToCsv("evodoc-appointments.csv", filteredRows)}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Appointment Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
            <FormField id="patientMode" label="Patient type" required>
              <Select id="patientMode" {...register("patientMode")}>
                <option value="existing">Existing patient</option>
                <option value="new">New patient</option>
              </Select>
            </FormField>

            {watchedMode === "existing" ? (
              <>
                <FormField id="patientSearch" label="Search existing patient">
                  <Input
                    id="patientSearch"
                    value={patientSearch}
                    onChange={(event) => setPatientSearch(event.target.value)}
                    placeholder="Search by patient name"
                  />
                </FormField>
                <FormField id="patientId" label="Select patient" required error={errors.patientId?.message}>
                  <Select id="patientId" {...register("patientId")}>
                    <option value="">Choose patient</option>
                    {searchedPatients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.fullName}
                      </option>
                    ))}
                  </Select>
                </FormField>
              </>
            ) : (
              <>
                <FormField
                  id="newPatientName"
                  label="New patient name"
                  required
                  error={errors.newPatientName?.message}
                >
                  <Input id="newPatientName" placeholder="Enter full name" {...register("newPatientName")} />
                </FormField>
                <FormField
                  id="newPatientPhone"
                  label="New patient phone"
                  required
                  error={errors.newPatientPhone?.message}
                >
                  <Input id="newPatientPhone" placeholder="+1 (555) 000-0000" {...register("newPatientPhone")} />
                </FormField>
              </>
            )}

            <FormField id="doctorId" label="Doctor" required error={errors.doctorId?.message}>
              <Select id="doctorId" {...register("doctorId")}>
                <option value="">Select doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField id="date" label="Date" required error={errors.date?.message}>
              <Input id="date" type="date" {...register("date")} />
            </FormField>
            <FormField id="time" label="Time" required error={errors.time?.message}>
              <Input id="time" type="time" {...register("time")} />
            </FormField>
            <FormField id="type" label="Appointment type" required error={errors.type?.message}>
              <Select id="type" {...register("type")}>
                <option value="General Consultation">General Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Cardiac Review">Cardiac Review</option>
                <option value="Dermatology Check">Dermatology Check</option>
                <option value="Lab Discussion">Lab Discussion</option>
                <option value="Teleconsultation">Teleconsultation</option>
              </Select>
            </FormField>

            <div className="md:col-span-2">
              <FormField id="notes" label="Notes" error={errors.notes?.message}>
                <Textarea id="notes" rows={3} placeholder="Clinical context or front-desk notes" {...register("notes")} />
              </FormField>
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                Availability:
                <span className={`ml-2 font-semibold ${availability?.className ?? "text-muted-foreground"}`}>
                  {availability?.label ?? "Select doctor and date"}
                </span>
              </p>
              <Button type="submit" className="rounded-xl" disabled={isSubmitting}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Appointments List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <FormField id="search" label="Search by patient">
                <div className="relative">
                  <UserSearch className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    className="pl-9"
                    placeholder="Type patient name"
                    value={tableSearch}
                    onChange={(event) => setTableSearch(event.target.value)}
                  />
                </div>
              </FormField>
            </div>
            <FormField id="doctorFilter" label="Filter by doctor">
              <Select
                id="doctorFilter"
                value={doctorFilter}
                onChange={(event) => setDoctorFilter(event.target.value)}
              >
                <option value="">All doctors</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField id="dateFilter" label="Filter by date">
              <Input id="dateFilter" type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
            </FormField>
            <FormField id="statusFilter" label="Filter by status">
              <Select
                id="statusFilter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as AppointmentStatus | "")}
              >
                <option value="">All status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
            </FormField>
            <div className="md:col-span-3 flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setTableSearch("");
                  setDoctorFilter("");
                  setDateFilter("");
                  setStatusFilter("");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>

          <DataTable
            rows={filteredRows}
            empty={
              <EmptyState
                icon={CalendarRange}
                title="No appointments found"
                description="Try a different search keyword or adjust your active filters."
              />
            }
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
                key: "date",
                title: "Date",
                render: (row) => (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(row.startsAt)} at {formatTime(row.startsAt)}
                  </p>
                )
              },
              {
                key: "status",
                title: "Status",
                render: (row) => <StatusBadge status={row.status} />
              },
              {
                key: "actions",
                title: "Quick actions",
                className: "min-w-[220px]",
                render: (row) => (
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`Viewing ${row.patientName}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`Editing ${row.id}`)}>
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setPendingCancel(row)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )
              }
            ]}
          />
        </CardContent>
      </Card>

      <AlertDialog open={Boolean(pendingCancel)} onOpenChange={(open) => !open && setPendingCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark {pendingCancel?.patientName ?? "the patient"}&apos;s appointment as cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction onClick={cancelAppointment}>Confirm Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

