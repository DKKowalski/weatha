import { CurrentWeather } from "@/components/shared/CurrentWeather";
import { WeatherHeader } from "@/components/shared/WeatherHeader";
import { WeeklyForecast } from "@/components/shared/WeeklyForecast";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const forecast = [
    {
      day: "Monday",
      highTemp: "20",
      lowTemp: "10",
      condition: "Sunny",
      weatherIcon: require("@/assets/images/sunny-cloud.png"),
      alt: "Sunny Cloud",
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-background-0 p-2">
      <WeatherHeader location="New York" dateTime="12:00" />
      <CurrentWeather
        temperature="20°C"
        condition="Sunny"
        weatherIcon={require("@/assets/images/sunny-cloud.png")}
        alt="Sunny Cloud"
      />
      <WeeklyForecast forecast={forecast} />
    </SafeAreaView>
  );
}
