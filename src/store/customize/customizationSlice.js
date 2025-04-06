import { createSlice } from "@reduxjs/toolkit";

const customizationSlice = createSlice({
  name: "customization",
  initialState: {
    gemShapes: [],
    gemStoneColors: [],
    birthStones: [],
    gemStones: [],
    prongStyles: [],
    ringSizes: [],
    bandWidths: [],
    settingHeights: [],
    bespokeCustomizations: [],
    bespokeWithTypes: [],
    metalTypes: [],
    clarity: [],
    metalKarate: [],
    ringSizeRing2: [],
  },
  reducers: {
    setGemShapes: (state, { payload }) => {
      state.gemShapes = payload;
    },
    setGemStoneColors: (state, { payload }) => {
      state.gemStoneColors = payload;
    },
    setBirthStones: (state, { payload }) => {
      state.birthStones = payload;
    },
    setGemStones: (state, { payload }) => {
      state.gemStones = payload;
    },
    setProngStyles: (state, { payload }) => {
      state.prongStyles = payload;
    },
    setRingSizes: (state, { payload }) => {
      state.ringSizes = payload;
    },
    setBandWidths: (state, { payload }) => {
      state.bandWidths = payload;
    },
    setSettingHeights: (state, { payload }) => {
      state.settingHeights = payload;
    },
    setBespokeCustomizations: (state, { payload }) => {
      state.bespokeCustomizations = payload;
    },
    setBespokeWithTypes: (state, { payload }) => {
      state.bespokeWithTypes = payload;
    },
    setAccentStoneTypes: (state, { payload }) => {
      state.accentStoneTypes = payload;
    },
    setMetalTypes: (state, { payload }) => {
      state.metalTypes = payload;
    },
    setClarity: (state, { payload }) => {
      state.clarity = payload;
    },
    setMetalKarate: (state, { payload }) => {
      state.metalKarate = payload;
    },
    setRing2RingSizes: (state, { payload }) => {
      state.ringSizeRing2 = payload;
    },
  },
});

export const {
  setGemShapes,
  setGemStoneColors,
  setBirthStones,
  setGemStones,
  setProngStyles,
  setRingSizes,
  setBandWidths,
  setSettingHeights,
  setBespokeCustomizations,
  setBespokeWithTypes,
  setAccentStoneTypes,
  setMetalTypes,
  setClarity,
  setMetalKarate,
  setRing2RingSizes,
} = customizationSlice.actions;
export default customizationSlice.reducer;
