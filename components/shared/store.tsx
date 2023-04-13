import { configureStore } from "@reduxjs/toolkit";
import boatSlice from "features/boat/boatSlice";

export const store = configureStore({
  reducer: {
    boat: boatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
