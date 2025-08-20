"use client";

import { useAppSelector, useAppDispatch } from "./hooks";
import { clearTable, selectTable, setTableStatus, Table, TableStatus } from "@/store/slices/tablesSlice";
import { updateReservation } from "@/store/slices/reservationsSlice";
import { Badge } from "./ui/Badge";
import { cn } from "./utils";
import { Check, Circle, Timer } from "lucide-react";

const statusToColor: Record<TableStatus, string> = {
  available: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/40",
  occupied: "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/40",
  reserved: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/40",
  cleaning: "bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/40"
};

function TableCard({ table }: { table: Table }) {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(s => s.tables.selectedTableId);
  const isSelected = selectedId === table.id;

  return (
    <button
      onClick={() => dispatch(selectTable(isSelected ? null : table.id))}
      className={cn(
        "group relative w-full rounded-xl border border-neutral-800/60 p-4 text-left transition",
        "hover:border-neutral-700 hover:bg-neutral-900/30",
        isSelected && "ring-2 ring-emerald-500/60"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{table.name}</div>
          <div className="text-xs text-neutral-400">Capacity: {table.capacity}</div>
        </div>
        <Badge className={statusToColor[table.status]}>{table.status}</Badge>
      </div>

      {isSelected && (
        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton
            label="Mark Available"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setTableStatus({ tableId: table.id, status: "available" }));
              if (table.currentReservationId) {
                dispatch(
                  updateReservation({
                    id: table.currentReservationId,
                    changes: { tableId: null, status: "active" }
                  })
                );
              }
            }}
            icon={<Circle className="h-4 w-4" />}
          />
          <ActionButton
            label="Mark Occupied"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setTableStatus({ tableId: table.id, status: "occupied" }));
            }}
            icon={<Check className="h-4 w-4" />}
          />
          <ActionButton
            label="Cleaning"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setTableStatus({ tableId: table.id, status: "cleaning" }));
            }}
            icon={<Timer className="h-4 w-4" />}
          />
          <ActionButton
            label="Clear"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(clearTable({ tableId: table.id }));
            }}
          />
        </div>
      )}
    </button>
  );
}

function ActionButton({ label, onClick, icon }: { label: string; onClick: (e: React.MouseEvent) => void; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-neutral-800/60 px-3 py-1.5 text-xs hover:border-neutral-700 hover:bg-neutral-900/40"
    >
      {icon}
      {label}
    </button>
  );
}

export function FloorPlan() {
  const tables = useAppSelector(s => s.tables.tables);

  return (
    <section id="floor" className="space-y-3">
      <h2 className="text-lg font-semibold">Floor Plan</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {tables.map(t => (
          <TableCard key={t.id} table={t} />
        ))}
      </div>
    </section>
  );
}


