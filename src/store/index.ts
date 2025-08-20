import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./slices/tablesSlice";
import reservationsReducer from "./slices/reservationsSlice";

export const store = configureStore({
  reducer: {
    tables: tablesReducer,
    reservations: reservationsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

