# EvoDoc Frontend

Production-grade healthcare SaaS frontend built with Next.js App Router for a startup-style product experience.

## Overview

EvoDoc includes two role-based portals:

- Receptionist / Nurse Portal
- Doctor Portal

It focuses on appointment operations, patient intake, and clinical record workflows with polished dashboard UX.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Shadcn-style component architecture (`components/ui`)
- React Hook Form + Zod validation
- Recharts (analytics charts)
- Lucide React (iconography)
- Framer Motion (transitions/animations)
- Sonner (toast notifications)
- Next Themes (dark mode toggle)

## Routes

- `/login`
- `/reception/dashboard`
- `/reception/patient-intake`
- `/reception/appointments`
- `/doctor/dashboard`
- `/doctor/appointments`
- `/doctor/patient/[id]`

## Core Features

### Reception Portal

- Reception dashboard with:
  - Welcome card
  - Live clock
  - KPI cards (today appointments, new patients, cancellations, wait time)
  - Quick actions
  - Recent bookings table
- Patient intake form with grouped sections and full Zod validation:
  - demographics
  - contact information
  - emergency contact
  - clinical context
- Appointment registration workflow:
  - existing vs new patient mode
  - doctor/date/time/type fields
  - availability indicator by doctor/day load
  - booking confirmation toast
- Appointments list:
  - debounced search
  - filter by doctor/date/status
  - CSV export
  - status badges
  - quick actions (view/edit/cancel)
  - cancel confirmation modal

### Doctor Portal

- Doctor dashboard with:
  - profile summary
  - notifications
  - today/week metrics
  - revenue + appointments chart
  - recent patients quick links
- Doctor appointments page:
  - upcoming and past sections
  - debounced patient search
  - status filtering
  - actionable appointment cards
- Patient detail page:
  - demographics and contact details
  - tabbed medical records (history, meds, allergies, notes)
  - add/save clinical note
  - update records action

### UX / Product Polish

- Sidebar navigation (desktop + mobile drawer)
- Dark mode toggle
- Loading skeletons per route
- Empty states for no-data results
- Smooth entry animations
- Soft shadows, rounded 2xl cards, blue + emerald healthcare palette

## Data Model

Local realistic mock data is stored under:

- `data/mock-data.ts`

Includes:

- 3 doctors
- 12 patients
- realistic appointment schedules
- notifications

Strong app types are defined in:

- `types/index.ts`

## Folder Structure

```txt
app/
  login/
  reception/
    dashboard/
    patient-intake/
    appointments/
  doctor/
    dashboard/
    appointments/
    patient/[id]/
components/
  ui/
  data-table.tsx
  empty-state.tsx
  form-field.tsx
  page-header.tsx
  realtime-clock.tsx
  sidebar.tsx
  stat-card.tsx
  status-badge.tsx
  theme-toggle.tsx
data/
hooks/
lib/
types/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```txt
http://localhost:3000/login
```

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run lint checks
- `npm run typecheck` - TypeScript type validation

## Trade-offs

- Data persistence is intentionally mocked in-memory for frontend scope.
- Authentication is role-selection based and not wired to backend auth.
- Form saves and update actions simulate API latency for UX realism.
- Reusable DataTable is intentionally lightweight (no external grid dependency) to keep architecture simple and maintainable.

## Future Enhancements

- Backend API integration (Prisma + PostgreSQL / REST or GraphQL)
- Real auth and RBAC with session handling
- Pagination and server-side filtering for large appointment volumes
- Audit logging and HIPAA-focused access trails
- Unit/integration tests (Vitest + RTL + Playwright)

