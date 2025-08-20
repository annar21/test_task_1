"use client";

import { useAppDispatch } from "./hooks";
import { createReservation } from "@/store/slices/reservationsSlice";
import { Input } from "./ui/Input";
import { useState } from "react";

export function WalkInPanel() {
  const dispatch = useAppDispatch();
  const [guestName, setGuestName] = useState("");
  const [partySize, setPartySize] = useState(2);

  function quickSeat() {
    dispatch(
      createReservation({
        guestName: guestName || "Walk-in",
        phone: "",
        partySize,
        datetime: new Date().toISOString(),
        specialRequests: "",
        tableId: null
      })
    );
    setGuestName("");
    setPartySize(2);
  }

  return (
    <section id="walkin" className="space-y-3">
      <h2 className="text-lg font-semibold">Walk-in</h2>
      <div className="rounded-xl border border-neutral-800/60 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input label="Guest Name" value={guestName} onChange={setGuestName} placeholder="Optional" />
          <Input label="Party Size" type="number" value={String(partySize)} onChange={(v) => setPartySize(Number(v) || 1)} />
          <button onClick={quickSeat} className="self-end rounded-lg border border-neutral-800/60 px-3 py-2 text-sm hover:border-neutral-700 hover:bg-neutral-900/40">
            Add Walk-in
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-2">Quickly add a walk-in as an immediate reservation.</p>
      </div>
    </section>
  );
}


