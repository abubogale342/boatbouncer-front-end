import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarkInfo: {
    id: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { setActiveId, resetId } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
