import { fetchCurrentWeather, fetchForecast } from "@/services/api";
import { useWeatherStore } from "@/store/store";
import { mapCurrentWeather } from "@/utils/mapCurrentWeather";
import { mapForecast } from "@/utils/mapWeeklyForecast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useWeather(
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
) {
  const setWeather = useWeatherStore((s) => s.setWeather);
  const current = useQuery({
    queryKey: ["currentWeather", lat, lon, units],
    queryFn: () => fetchCurrentWeather(lat, lon, units),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    select: (data) => mapCurrentWeather(data),
  });

  const forecast = useQuery({
    queryKey: ["forecast", lat, lon, units],
    queryFn: () => fetchForecast(lat, lon, units),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 30,
    retry: 1,
    select: (data) => mapForecast(data),
  });

  useEffect(() => {
    // Persist the raw API data if needed for offline fallback.
    if (current.data && forecast.data) {
      setWeather(current.data as any, forecast.data as any);
    }
  }, [current.data, forecast.data, setWeather]);

  return { current, forecast };
}
