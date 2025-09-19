import { useWeatherStore } from "@/store/store";
import * as Location from "expo-location";

export async function initLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Location permission denied");
  }

  const { coords } = await Location.getCurrentPositionAsync({});
  useWeatherStore
    .getState()
    .setCoords({ lat: coords.latitude, lon: coords.longitude });
}