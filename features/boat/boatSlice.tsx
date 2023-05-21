import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boatInfo: {
    boatName: "",
    boatType: "",
    description: "",
    manufacturer: "",
    model: "",
    year: 2023,
    length: 100,
    captained: false,
    amenities: [],
    imageUrls: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    latLng: {
      latitude: null,
      longitude: null,
    },
    category: "",
    subCategory: "",
    features: "",
    securityAllowance: "",
    pricing: [
      {
        type: "Per Hour",
        min: 1,
      },
    ],
  },
  editableBoat: null,
  bookmarks: null,
};

export const boatSlice = createSlice({
  name: "Boat",
  initialState,
  reducers: {
    updateBasicInfoField: (state: any, { payload: { key, value } }) => {
      state.boatInfo[key] = value;
    },
    updateLocationField: (state: any, { payload: { key, value } }) => {
      state.boatInfo.location[key] = value;
    },
    updateCoordinateField: (state: any, { payload: { key, value } }) => {
      state.boatInfo.latLng[key] = value;
    },
    updateFeaturesList: (state, { payload: { key, value } }) => {
      if (value) {
        state.boatInfo.features = key;
      } else {
        state.boatInfo.features = "";
      }
    },
    updateCategory: (state: any, { payload: { key, value } }) => {
      state.boatInfo.category = value;
    },
    updateAmenitiesList: (state: any, { payload: { key, value } }) => {
      if (value) {
        state.boatInfo.amenities = [...state.boatInfo.amenities, key];
      } else {
        let filteredState = state.boatInfo.amenities.filter(
          (val: string) => val !== key,
        );
        state.boatInfo.amenities = filteredState;
      }
    },

    updateCaptainedList: (state: any, { payload: { key, value } }) => {
      state.boatInfo.captained = value;
    },

    updateImageUrls: (state: any, { payload: imageUrl }) => {
      state.boatInfo.imageUrls = imageUrl;
    },

    updateSubCategory: (state: any, { payload: { key, value } }) => {
      state.boatInfo.subCategory = value;
    },
    resetSubCategories: (state) => {
      state.boatInfo.subCategory = "";
    },
    setBoatInfo: (state, { payload: boatInfo }) => {
      state.boatInfo = boatInfo;
    },
    setEditableBoat: (state: any, { payload: boatInfo }) => {
      state.editableBoat = boatInfo;
    },
    resetBoat: (state) => {
      state.boatInfo = initialState.boatInfo;
      state.editableBoat = initialState.editableBoat;
    },
    setBookmarks: (state, { payload: bookmarks }) => {
      state.bookmarks = bookmarks;
    },
    resetBookmarks: (state) => {
      state.bookmarks = initialState.bookmarks;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateBasicInfoField,
  updateLocationField,
  updateCoordinateField,
  updateFeaturesList,
  updateCategory,
  updateAmenitiesList,
  updateImageUrls,
  updateSubCategory,
  resetSubCategories,
  updateCaptainedList,
  setBoatInfo,
  setEditableBoat,
  resetBoat,
  setBookmarks,
  resetBookmarks,
} = boatSlice.actions;

export default boatSlice.reducer;
