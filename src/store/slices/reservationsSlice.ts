import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";

export type ReservationStatus = "active" | "seated" | "cancelled";

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  partySize: number;
  datetime: string; // ISO
  specialRequests?: string;
  tableId?: string | null;
  status: ReservationStatus;
}

export interface ReservationsState {
  reservations: Reservation[];
  selectedReservationId: string | null;
}

const now = new Date();
const sampleReservations: Reservation[] = [
  {
    id: nanoid(),
    guestName: "Alice Johnson",
    phone: "+1 555 111 2222",
    partySize: 2,
    datetime: formatISO(now),
    specialRequests: "Window seat",
    status: "active",
    tableId: null
  },
  {
    id: nanoid(),
    guestName: "Mark Spencer",
    phone: "+1 555 222 3333",
    partySize: 4,
    datetime: formatISO(now),
    specialRequests: "Birthday",
    status: "active",
    tableId: null
  }
];

const initialState: ReservationsState = {
  reservations: sampleReservations,
  selectedReservationId: null
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    selectReservation(state, action: PayloadAction<string | null>) {
      state.selectedReservationId = action.payload;
    },
    createReservation(
      state,
      action: PayloadAction<
        Omit<
          Reservation,
          "id" | "status"
        > & { status?: ReservationStatus }
      >
    ) {
      const id = nanoid();
      state.reservations.push({ id, status: "active", ...action.payload });
    },
    updateReservation(
      state,
      action: PayloadAction<{ id: string; changes: Partial<Reservation> }>
    ) {
      const reservation = state.reservations.find(r => r.id === action.payload.id);
      if (reservation) {
        Object.assign(reservation, action.payload.changes);
      }
    },
    cancelReservation(state, action: PayloadAction<{ id: string }>) {
      const reservation = state.reservations.find(r => r.id === action.payload.id);
      if (reservation) {
        reservation.status = "cancelled";
      }
    },
    seatReservation(
      state,
      action: PayloadAction<{ id: string; tableId: string | null }>
    ) {
      const reservation = state.reservations.find(r => r.id === action.payload.id);
      if (reservation) {
        reservation.status = "seated";
        reservation.tableId = action.payload.tableId;
      }
    },
    deleteReservation(state, action: PayloadAction<{ id: string }>) {
      state.reservations = state.reservations.filter(r => r.id !== action.payload.id);
    }
  }
});

export const {
  selectReservation,
  createReservation,
  updateReservation,
  cancelReservation,
  seatReservation,
  deleteReservation
} = reservationsSlice.actions;

export default reservationsSlice.reducer;

