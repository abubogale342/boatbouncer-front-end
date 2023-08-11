import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
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
    imageUrls: ["", "", "", "", "", ""],
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
    category: [],
    subCategory: [],
    features: "",
    securityAllowance: "",
    pricing: [],
    currency: "USD",
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
    updateCategory: (state: any, { payload: value }) => {
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
    updateSecurityAllowance: (state: any, { payload: value }) => {
      state.boatInfo.securityAllowance = value;
    },
    updateImageUrls: (state: any, { payload: { key, imageUrl } }) => {
      let updatedImageUrls = state.boatInfo.imageUrls;
      updatedImageUrls[key] = imageUrl;
      state.boatInfo.imageUrls = updatedImageUrls;
    },
    updateSubCategory: (state: any, { payload: value }) => {
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
    updateCurrency: (state, { payload: currency }) => {
      state.currency = currency;
    },
    updatePricing: (state, { payload: { type, action, value, min = 1 } }) => {
      if (action) {
        let index = state.boatInfo.pricing.findIndex(
          (priceType: any) => priceType.type === type,
        );
        let updatedPricing = state.boatInfo.pricing;
        if (index !== -1) {
          updatedPricing[index] = { ...updatedPricing[index], value, min };
        } else {
          updatedPricing = [...state.boatInfo.pricing, { type, value, min }];
        }
        state.boatInfo.pricing = updatedPricing;
      } else {
        let updatedPricing = state.boatInfo.pricing.filter(
          (priceType: any) => priceType.type !== type,
        );
        state.boatInfo.pricing = updatedPricing;
      }
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
  updateCurrency,
  resetSubCategories,
  updateCaptainedList,
  setBoatInfo,
  setEditableBoat,
  resetBoat,
  setBookmarks,
  resetBookmarks,
  updatePricing,
  updateSecurityAllowance,
} = boatSlice.actions;

export default boatSlice.reducer;
