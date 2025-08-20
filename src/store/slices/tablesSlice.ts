import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: TableStatus;
  currentReservationId?: string | null;
}

export interface TablesState {
  tables: Table[];
  selectedTableId: string | null;
}

const initialTables: Table[] = [
  { id: "T1", name: "T1", capacity: 2, status: "available" },
  { id: "T2", name: "T2", capacity: 2, status: "available" },
  { id: "T3", name: "T3", capacity: 4, status: "reserved" },
  { id: "T4", name: "T4", capacity: 4, status: "available" },
  { id: "T5", name: "T5", capacity: 4, status: "occupied" },
  { id: "T6", name: "T6", capacity: 6, status: "available" },
  { id: "T7", name: "T7", capacity: 2, status: "available" },
  { id: "T8", name: "T8", capacity: 2, status: "available" },
  { id: "T9", name: "T9", capacity: 4, status: "available" },
  { id: "T10", name: "T10", capacity: 6, status: "available" }
];

const initialState: TablesState = {
  tables: initialTables,
  selectedTableId: null
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    selectTable(state, action: PayloadAction<string | null>) {
      state.selectedTableId = action.payload;
    },
    setTableStatus(
      state,
      action: PayloadAction<{ tableId: string; status: TableStatus }>
    ) {
      const table = state.tables.find(t => t.id === action.payload.tableId);
      if (table) {
        table.status = action.payload.status;
        if (action.payload.status !== "reserved") {
          table.currentReservationId = null;
        }
      }
    },
    assignReservationToTable(
      state,
      action: PayloadAction<{ tableId: string; reservationId: string }>
    ) {
      const table = state.tables.find(t => t.id === action.payload.tableId);
      if (table) {
        table.currentReservationId = action.payload.reservationId;
        table.status = "reserved";
      }
    },
    clearTable(state, action: PayloadAction<{ tableId: string }>) {
      const table = state.tables.find(t => t.id === action.payload.tableId);
      if (table) {
        table.status = "available";
        table.currentReservationId = null;
      }
    }
  }
});

export const {
  selectTable,
  setTableStatus,
  assignReservationToTable,
  clearTable
} = tablesSlice.actions;

export default tablesSlice.reducer;

