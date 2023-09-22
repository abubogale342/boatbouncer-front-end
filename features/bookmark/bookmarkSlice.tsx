import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarkInfo: {
    id: null,
    ids: null,
  },
};

export const bookmarkSlice = createSlice({
  name: "Bookmark",
  initialState,
  reducers: {
    setActiveId: (state: any, { payload: id }) => {
      state.bookmarkInfo.id = id;
    },
    resetId: (state) => {
      state.bookmarkInfo.id = initialState.bookmarkInfo.id;
    },
    setActiveIds: (state: any, { payload: ids }) => {
      state.bookmarkInfo.ids = ids;
    },
    resetIds: (state) => {
      state.bookmarkInfo.ids = initialState.bookmarkInfo.ids;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveId, resetId, setActiveIds, resetIds } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
