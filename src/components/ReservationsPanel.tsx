"use client";

import { useAppDispatch, useAppSelector } from "./hooks";
import { Reservation, cancelReservation, createReservation, deleteReservation, selectReservation, updateReservation } from "@/store/slices/reservationsSlice";
import { assignReservationToTable } from "@/store/slices/tablesSlice";
import { format } from "date-fns";
import { Badge } from "./ui/Badge";
import { Input } from "./ui/Input";
import { cn } from "./utils";

export function ReservationsPanel() {
  const dispatch = useAppDispatch();
  const { reservations, selectedReservationId } = useAppSelector(s => s.reservations);
  const tables = useAppSelector(s => s.tables.tables);

  const selected = reservations.find(r => r.id === selectedReservationId) || null;

  function handleAssign(tableId: string, res: Reservation) {
    dispatch(assignReservationToTable({ tableId, reservationId: res.id }));
    dispatch(updateReservation({ id: res.id, changes: { tableId } }));
  }

  return (
    <section id="reservations" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Reservations</h2>
        <CreateReservationButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          {reservations.map(r => (
            <button
              key={r.id}
              onClick={() => dispatch(selectReservation(selectedReservationId === r.id ? null : r.id))}
              className={cn(
                "w-full rounded-xl border border-neutral-800/60 p-4 text-left hover:border-neutral-700 hover:bg-neutral-900/30",
                selectedReservationId === r.id && "ring-2 ring-amber-500/60"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{r.guestName} · {r.partySize}</div>
                <Badge className={
                  r.status === "active"
                    ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/40"
                    : r.status === "seated"
                    ? "bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/40"
                    : "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/40"
                }>
                  {r.status}
                </Badge>
              </div>
              <div className="text-xs text-neutral-400">{format(new Date(r.datetime), "PPp")} · {r.phone}</div>
              {selectedReservationId === r.id && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    className="rounded-lg border border-neutral-800/60 px-3 py-1.5 text-xs hover:border-neutral-700 hover:bg-neutral-900/40"
                    onClick={(e) => { e.stopPropagation(); dispatch(cancelReservation({ id: r.id })); }}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-lg border border-neutral-800/60 px-3 py-1.5 text-xs hover:border-neutral-700 hover:bg-neutral-900/40"
                    onClick={(e) => { e.stopPropagation(); dispatch(deleteReservation({ id: r.id })); }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-neutral-800/60 p-4">
          <h3 className="font-medium">Details</h3>
          {!selected && <p className="text-sm text-neutral-400 mt-2">Select a reservation to view and edit details.</p>}
          {selected && (
            <div className="mt-3 space-y-3">
              <Input
                label="Guest Name"
                value={selected.guestName}
                onChange={(v) => dispatch(updateReservation({ id: selected.id, changes: { guestName: v } }))}
              />
              <Input
                label="Phone"
                value={selected.phone}
                onChange={(v) => dispatch(updateReservation({ id: selected.id, changes: { phone: v } }))}
              />
              <Input
                label="Party Size"
                type="number"
                value={String(selected.partySize)}
                onChange={(v) => dispatch(updateReservation({ id: selected.id, changes: { partySize: Number(v) || 1 } }))}
              />
              <Input
                label="Date & Time"
                type="datetime-local"
                value={selected.datetime.slice(0, 16)}
                onChange={(v) => dispatch(updateReservation({ id: selected.id, changes: { datetime: new Date(v).toISOString() } }))}
              />
              <Input
                label="Special Requests"
                value={selected.specialRequests ?? ""}
                onChange={(v) => dispatch(updateReservation({ id: selected.id, changes: { specialRequests: v } }))}
              />

              <div className="pt-2">
                <div className="text-xs text-neutral-400 mb-2">Assign to table</div>
                <div className="flex flex-wrap gap-2">
                  {tables.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleAssign(t.id, selected)}
                      className={cn(
                        "text-xs rounded-lg border border-neutral-800/60 px-3 py-1.5 hover:border-neutral-700 hover:bg-neutral-900/40",
                        selected.tableId === t.id && "ring-2 ring-amber-500/60"
                      )}
                    >
                      {t.name} ({t.capacity})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CreateReservationButton() {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() =>
        dispatch(
          createReservation({
            guestName: "New Guest",
            phone: "",
            partySize: 2,
            datetime: new Date().toISOString(),
            specialRequests: "",
            tableId: null
          })
        )
      }
      className="rounded-lg border border-neutral-800/60 px-3 py-2 text-sm hover:border-neutral-700 hover:bg-neutral-900/40"
    >
      New Reservation
    </button>
  );
}


