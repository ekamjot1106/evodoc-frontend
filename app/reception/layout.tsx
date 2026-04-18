"use client";

import { CalendarCheck2, LayoutDashboard, UserPlus2 } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

const navItems = [
  { href: "/reception/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reception/patient-intake", label: "Patient Intake", icon: UserPlus2 },
  { href: "/reception/appointments", label: "Appointments", icon: CalendarCheck2 }
];

export default function ReceptionLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar title="Reception Portal" subtitle="Front Desk Operations" navItems={navItems}>
      {children}
    </Sidebar>
  );
}
