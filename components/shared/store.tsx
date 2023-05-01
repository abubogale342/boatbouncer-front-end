import { configureStore } from "@reduxjs/toolkit";

import boatSlice from "features/boat/boatSlice";
import cardSlice from "features/card/cardSlice";
import bookmarkSlice from "features/bookmark/bookmarkSlice";

export const store = configureStore({
  reducer: {
    boat: boatSlice,
    card: cardSlice,
    bookmark: bookmarkSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
