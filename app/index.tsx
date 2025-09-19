import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

import { CurrentWeather } from "@/components/shared/CurrentWeather";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { WeatherHeader } from "@/components/shared/WeatherHeader";
import { WeeklyForecast } from "@/components/shared/WeeklyForecast";

import NoDataAvailable from "@/components/shared/NoDataAvailableScreen";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherStore } from "@/store/store";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";

export default function Index() {
  const coords = useWeatherStore((s) => s.coords);
  const units = useWeatherStore((s) => s.units);
  const lastCurrent = useWeatherStore((s) => s.lastCurrentWeather);
  const lastForecast = useWeatherStore((s) => s.lastForecast);

  const { current, forecast } = useWeather(coords?.lat!, coords?.lon!, units);

  // helpers
  const hasPersistedData = !!lastCurrent && !!lastForecast;
  const isLoading = current.isLoading || forecast.isLoading;

  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowSearch((prev) => !prev);
  };
  const closeSearch = () => setShowSearch(false);

  if (!hasPersistedData && isLoading) {
    return (
      <LoadingScreen>
        <Text>Fetching your weather...</Text>
      </LoadingScreen>
    );
  }

  const cw = (current.data || lastCurrent || null) as any | null;
  const headerCity = (cw?.city as string | undefined) ?? undefined;
  const country = (cw?.country as string | undefined) ?? undefined;
  const locationParts = [headerCity, country].filter(Boolean) as string[];
  const safeLocation = locationParts.length
    ? locationParts.join(", ")
    : undefined;
  const dateTime = (cw?.dateTime as string | undefined) ?? undefined;
  const tempStr = cw?.temp != null ? String(cw.temp) : "--";
  const condition = (cw?.description as string | undefined) ?? "No data";
  const iconSrc = cw?.icon
    ? typeof cw.icon === "string"
      ? { uri: cw.icon }
      : cw.icon
    : require("@/assets/images/sunny-cloud.png");

  const forecastWeather = (forecast.data || lastForecast || []) as any[];

  return (
    <SafeAreaView className="flex-1 p-2 bg-background-0">
      <WeatherHeader
        location={safeLocation}
        dateTime={dateTime}
        onPressSearch={toggleSearch}
      />

      <CurrentWeather
        temperature={`${tempStr}°`}
        condition={condition}
        weatherIcon={iconSrc}
        alt={condition}
      />

      <WeeklyForecast forecast={forecastWeather} />

      {showSearch ? <NoDataAvailable onClosed={closeSearch} /> : null}
    </SafeAreaView>
  );
}
