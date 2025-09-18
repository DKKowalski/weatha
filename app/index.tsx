import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

import { CurrentWeather } from "@/components/shared/CurrentWeather";
import LoadingScreen from "@/components/shared/LoadingScreen";
import NoDataAvailable from "@/components/shared/NoDataAvailableScreen";
import { WeatherHeader } from "@/components/shared/WeatherHeader";
import { WeeklyForecast } from "@/components/shared/WeeklyForecast";

import { useWeather } from "@/hooks/useWeather";
import { useWeatherStore } from "@/store/store";

export default function Index() {
  const coords = useWeatherStore((s) => s.coords);
  const units = useWeatherStore((s) => s.units);
  const lastCurrent = useWeatherStore((s) => s.lastCurrentWeather);
  const lastForecast = useWeatherStore((s) => s.lastForecast);

  const { current, forecast } = useWeather(coords?.lat!, coords?.lon!, units);

  // helpers
  const hasPersistedData = !!lastCurrent && !!lastForecast;
  const isLoading = current.isLoading || forecast.isLoading;
  const hasErrors = current.error || forecast.error;
  const hasNoFreshData =
    !current.data ||
    !forecast.data ||
    (Array.isArray(forecast.data) && forecast.data.length === 0);

  // invalid if: no coords OR (no persisted data + either error or empty data)
  const isInvalid =
    !coords || (!hasPersistedData && (hasErrors || hasNoFreshData));

  if (isInvalid) return <NoDataAvailable />;
  if (!hasPersistedData && isLoading) {
    return (
      <LoadingScreen>
        <Text>Fetching your weather...</Text>
      </LoadingScreen>
    );
  }

  const currentWeather = current.data || lastCurrent;
  const forecastWeather = forecast.data || lastForecast;

  return (
    <SafeAreaView className="flex-1 p-2 bg-background-0">
      <WeatherHeader
        location={`${currentWeather.city}, ${currentWeather.country}`}
        dateTime={currentWeather.dateTime}
      />

      <CurrentWeather
        temperature={`${currentWeather.temp}°`}
        condition={currentWeather.description}
        weatherIcon={{ uri: currentWeather.icon }}
        alt={currentWeather.description}
      />

      <WeeklyForecast forecast={forecastWeather} />
    </SafeAreaView>
  );
}
