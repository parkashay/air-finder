export function formatDateToYYYYMMDD(date: Date) {
  return date.toISOString().split("T")[0];
}
