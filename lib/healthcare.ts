import type { Appointment, AppointmentView } from "@/types";
import { getAppointmentViews } from "@/data/mock-data";

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getTodayAppointments(appointments: Appointment[]) {
  const today = new Date();
  return appointments.filter((appointment) => sameDay(new Date(appointment.startsAt), today));
}

export function getThisWeekAppointments(appointments: Appointment[]) {
  const now = new Date();
  const day = now.getDay();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - day);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  return appointments.filter((appointment) => {
    const date = new Date(appointment.startsAt);
    return date >= weekStart && date < weekEnd;
  });
}

export function getRecentBookings(limit = 6): AppointmentView[] {
  return getAppointmentViews()
    .toSorted((a, b) => +new Date(b.startsAt) - +new Date(a.startsAt))
    .slice(0, limit);
}

export function groupByUpcomingAndPast(appointments: AppointmentView[]) {
  const now = new Date();
  const upcoming = appointments.filter((appointment) => new Date(appointment.startsAt) >= now);
  const past = appointments.filter((appointment) => new Date(appointment.startsAt) < now);

  return {
    upcoming: upcoming.toSorted((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt)),
    past: past.toSorted((a, b) => +new Date(b.startsAt) - +new Date(a.startsAt))
  };
}

export function chartDataFromAppointments(appointments: Appointment[]) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date;
  });

  return days.map((date) => {
    const dayAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.startsAt);
      return (
        appointmentDate.getFullYear() === date.getFullYear() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getDate() === date.getDate()
      );
    });

    return {
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      appointments: dayAppointments.length,
      revenue: dayAppointments
        .filter((appointment) => appointment.status !== "Cancelled")
        .reduce((sum, appointment) => sum + appointment.fee, 0)
    };
  });
}

