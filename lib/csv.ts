import type { AppointmentStatus, AppointmentView } from "@/types";

function csvEscape(value: string | number) {
  const stringValue = String(value).replaceAll('"', '""');
  return `"${stringValue}"`;
}

export function exportAppointmentsToCsv(filename: string, rows: AppointmentView[]) {
  const headers = [
    "Appointment ID",
    "Patient",
    "Doctor",
    "Specialty",
    "Date",
    "Status",
    "Type",
    "Notes"
  ];

  const body = rows.map((row) => [
    row.id,
    row.patientName,
    row.doctorName,
    row.doctorSpecialty,
    new Date(row.startsAt).toLocaleString(),
    row.status,
    row.type,
    row.notes
  ]);

  const csv = [headers, ...body]
    .map((line) => line.map((cell) => csvEscape(cell)).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function statusOrder(status: AppointmentStatus) {
  const order: Record<AppointmentStatus, number> = {
    Scheduled: 1,
    Completed: 2,
    Cancelled: 3
  };

  return order[status];
}

