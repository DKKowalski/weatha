import axios from "axios";
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeather(
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
) {
  try {
    const res = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, units, appid: API_KEY },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch current weather"
    );
  }
}

export async function fetchForecast(
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
) {
  try {
    const res = await axios.get(`${BASE_URL}/forecast`, {
      params: { lat, lon, units, appid: API_KEY },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch forecast");
  }
}

export async function fetchCityWeather(
  city: string,
  units: "metric" | "imperial" = "metric"
) {
  try {
    const res = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, units, appid: API_KEY },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch city weather"
    );
  }
}
