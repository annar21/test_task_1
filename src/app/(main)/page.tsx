"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { FloorPlan } from "@/components/FloorPlan";
import { ReservationsPanel } from "@/components/ReservationsPanel";
import { WalkInPanel } from "@/components/WalkInPanel";
import { LayoutShell } from "@/components/LayoutShell";

export default function HomePage() {
  return (
    <Provider store={store}>
      <LayoutShell>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7">
            <FloorPlan />
          </div>
          <div className="xl:col-span-5 space-y-6">
            <ReservationsPanel />
            <WalkInPanel />
          </div>
        </div>
      </LayoutShell>
    </Provider>
  );
}


