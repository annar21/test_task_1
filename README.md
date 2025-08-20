Restaurant Table Management System (MVP)

Tech stack: Next.js App Router + Tailwind v4 + Redux Toolkit.

Getting Started

1. Install dependencies: `npm i`
2. Dev server: `npm run dev`
3. Open `http://localhost:3000`

Features in the MVP

- Table Overview: Visual floor plan with per-table status (available, occupied, reserved, cleaning) and quick actions.
- Reservation System: Create, edit, cancel, delete reservations; assign a reservation to a table.
- Real-time Updates (frontend state): Status changes reflected immediately via Redux.
- Walk-ins: Quick add for walk-in guests.

Structure

- `src/store/*`: Redux store and slices (`tables`, `reservations`).
- `src/components/*`: UI components (`FloorPlan`, `ReservationsPanel`, `WalkInPanel`).
- `src/app/(main)/page.tsx`: Main page composing the panels within a responsive layout.

Notes

- No backend included. Another developer can wire API calls (RTK Query) in place of current in-memory state.
