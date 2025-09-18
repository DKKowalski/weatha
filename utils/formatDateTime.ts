export function formatDateTime(unix: number) {
  const date = new Date(unix * 1000);
  return date.toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
