import { formatDateTime } from "./formatDateTime";

export function mapCurrentWeather(data: any) {
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
    dateTime: formatDateTime(data.dt),
  };
}
