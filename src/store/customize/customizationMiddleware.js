import { Component } from "react";
import { setLoading, setNetworkError } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import {
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
} from "./customizationSlice";

export class CustomizationMiddleware extends Component {
  static fetchCaratRing2(data) {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const res = await ApiCaller.Post("/api/v1/products/metal_karate", data);

        if (res.data.status) {
          dispatch(setMetalKarate(res.data.data));
        }
        dispatch(setNetworkError(false));
      } catch (error) {
        dispatch(setNetworkError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };
  }
  static fetchGemShapes(token) {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const res = await ApiCaller.Get("/api/v1/products/gemshapes");

        if (res.data.gemshapes) {
          dispatch(setGemShapes(res.data.gemshapes));
        }
        dispatch(setNetworkError(false));
      } catch (error) {
        dispatch(setNetworkError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };
  }

  static fetchGemStoneColors(token) {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const res = await ApiCaller.Get("/api/v1/products/gem_stones_colors");

        if (res.data.GemStoneColors) {
          dispatch(setGemStoneColors(res.data.GemStoneColors));
        }
        dispatch(setNetworkError(false));
      } catch (error) {
        dispatch(setNetworkError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };
  }

  static fetchAllCustomizationData(token) {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));

        const [
          gemShapes,
          gemStoneColors,
          birthStones,
          gemStones,
          prongStyles,
          ringSizes,
          bandWidths,
          settingHeights,
          bespokeCustomizations,
          bespokeWithTypes,
          accentStoneTypes,
          metalTypes,
          clarity,
          metalKarate,
        ] = await Promise.all([
          ApiCaller.Get("/api/v1/products/gemshapes"),
          ApiCaller.Get("/api/v1/products/gem_stones_colors"),
          ApiCaller.Get("/api/v1/products/birthstones"),
          ApiCaller.Get("/api/v1/products/gem_stones"),
          ApiCaller.Get("/api/v1/customization/prong_style"),
          ApiCaller.Get("/api/v1/customization/ring_size"),
          ApiCaller.Get("/api/v1/customization/band_widths"),
          ApiCaller.Get("/api/v1/customization/setting_height"),
          ApiCaller.Get("/api/v1/customization/bespoke_customization"),
          ApiCaller.Get("/api/v1/customization/bespoke_with_types"),
          ApiCaller.Get("/api/v1/customization/accent_stone_type"),
          ApiCaller.Get("/api/v1/products/metal_type_category"),
          ApiCaller.Get("/api/v1/products/clarity"),
          // ApiCaller.Get("/api/v1/products/metal_karate"),
        ]);

        dispatch(setGemShapes(gemShapes.data.gemshapes || []));
        dispatch(setGemStoneColors(gemStoneColors.data.GemStoneColors || []));
        dispatch(setBirthStones(birthStones.data.BirthStones || []));
        dispatch(setGemStones(gemStones.data.Gemstones || []));
        dispatch(setProngStyles(prongStyles.data.data || []));
        dispatch(setRingSizes(ringSizes.data.data || []));
        dispatch(setBandWidths(bandWidths.data.data || []));
        dispatch(setSettingHeights(settingHeights.data.data || []));
        dispatch(
          setBespokeCustomizations(bespokeCustomizations.data.data || [])
        );
        dispatch(
          setBespokeWithTypes(bespokeWithTypes.data.BespokeCustomizations || [])
        );
        dispatch(setAccentStoneTypes(accentStoneTypes.data.data || []));
        dispatch(setMetalTypes(metalTypes.data.metal_types || []));
        dispatch(setClarity(clarity.data.data || []));
        // dispatch(setMetalKarate(metalKarate.data.data || []));
        dispatch(setNetworkError(false));
      } catch (error) {
        dispatch(setNetworkError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };
  }

  static fetchRing2CustomizationData(token) {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));

        const [clarity, ringSizes] = await Promise.all([
          ApiCaller.Get("/api/v1/products/clarity"),
          ApiCaller.Get("/ring2/get_stone_size"),
        ]);
        dispatch(setClarity(clarity.data.data || []));
        dispatch(setRing2RingSizes(ringSizes.data.data || []));

        // dispatch(setMetalKarate(metalKarate.data.data || []));
        dispatch(setNetworkError(false));
      } catch (error) {
        dispatch(setNetworkError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };
  }
}
