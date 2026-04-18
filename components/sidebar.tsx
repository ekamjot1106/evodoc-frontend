"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, X, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

function SidebarPanel({
  title,
  subtitle,
  navItems,
  pathname,
  close
}: {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  pathname: string;
  close?: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-none border-r border-border/70 bg-card/85 px-5 pb-6 pt-5 backdrop-blur-xl md:rounded-r-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold tracking-tight text-primary">EvoDoc</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <ThemeToggle />
      </div>
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-3">
        <div className="rounded-2xl bg-primary/10 p-3 text-xs text-primary">
          <p className="font-semibold">Platform status</p>
          <p className="mt-1 text-primary/90">All systems operational. Last sync 2 mins ago.</p>
        </div>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/login" onClick={close}>
            <LogOut className="mr-2 h-4 w-4" />
            Switch account
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function Sidebar({ title, subtitle, navItems, children }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen md:flex">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/70 bg-background/75 px-4 py-3 backdrop-blur md:hidden">
        <div>
          <p className="text-base font-semibold text-primary">EvoDoc</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Button size="icon" variant="outline" onClick={() => setMobileOpen(true)}>
          <Menu className="h-4 w-4" />
        </Button>
      </header>

      <aside className="hidden w-[280px] shrink-0 md:block md:sticky md:top-0 md:h-screen">
        <SidebarPanel title={title} subtitle={subtitle} navItems={navItems} pathname={pathname} />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/35 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full w-[280px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex justify-end p-3">
                <Button size="icon" variant="ghost" onClick={() => setMobileOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <SidebarPanel
                title={title}
                subtitle={subtitle}
                navItems={navItems}
                pathname={pathname}
                close={() => setMobileOpen(false)}
              />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="min-w-0 flex-1">
        <div className="page-shell">{children}</div>
      </main>
    </div>
  );
}

