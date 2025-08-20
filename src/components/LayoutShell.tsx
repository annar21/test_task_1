"use client";

import { Calendar, LayoutGrid, Users } from "lucide-react";
import Link from "next/link";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-neutral-800/40 bg-background/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutGrid className="h-6 w-6" />
            <span className="font-semibold tracking-wide">Table Manager</span>
          </div>
          <nav className="text-sm flex items-center gap-6">
            <Link href="#floor" className="hover:underline inline-flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" /> Floor
            </Link>
            <Link href="#reservations" className="hover:underline inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Reservations
            </Link>
            <Link href="#walkin" className="hover:underline inline-flex items-center gap-2">
              <Users className="h-4 w-4" /> Walk-ins
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">{children}</main>
    </div>
  );
}


