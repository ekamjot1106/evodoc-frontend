"use client";

import { CalendarClock, LayoutDashboard, UsersRound } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

const navItems = [
  { href: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/doctor/appointments", label: "Appointments", icon: CalendarClock },
  { href: "/doctor/patient/pat-1001", label: "Patient Records", icon: UsersRound }
];

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar title="Doctor Portal" subtitle="Clinical Workspace" navItems={navItems}>
      {children}
    </Sidebar>
  );
}
