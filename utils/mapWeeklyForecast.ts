export function mapForecast(data: any) {
  // Group forecast list by day
  const days: Record<string, any[]> = {};

  data.list.forEach((entry: any) => {
    const date = new Date(entry.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    if (!days[day]) days[day] = [];
    days[day].push(entry);
  });

  // For each day, pick the "midday" forecast (or fallback to first)
  return Object.entries(days).map(([day, entries]) => {
    const target = entries[Math.floor(entries.length / 2)];

    return {
      day,
      highTemp: Math.round(
        Math.max(...entries.map((e) => e.main.temp_max))
      ).toString(),
      lowTemp: Math.round(
        Math.min(...entries.map((e) => e.main.temp_min))
      ).toString(),
      condition: target.weather[0].description,
      weatherIcon: `https://openweathermap.org/img/wn/${target.weather[0].icon}@4x.png`,
      alt: target.weather[0].main,
    };
  });
}
