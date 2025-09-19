import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type WeatherUIState = {
  coords: { lat: number; lon: number } | null;
  units: "metric" | "imperial";
  lastCurrentWeather: any | null;
  lastForecast: any | null;
  setCoords: (coords: { lat: number; lon: number }) => void;
  setUnits: (units: "metric" | "imperial") => void;
  setWeather: (current: any, forecast: any) => void;
  reset: () => void;
};

export const useWeatherStore = create<WeatherUIState>()(
  persist(
    (set) => ({
      coords: null,
      units: "metric",
      lastCurrentWeather: null,
      lastForecast: null,
      setCoords: (coords) => set({ coords }),
      setUnits: (units) => set({ units }),
      setWeather: (current, forecast) =>
        set({ lastCurrentWeather: current, lastForecast: forecast }),
      reset: () =>
        set({
          coords: null,
          units: "metric",
          lastCurrentWeather: null,
          lastForecast: null,
        }),
    }),
    {
      name: "weather-ui",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
