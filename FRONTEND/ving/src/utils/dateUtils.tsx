export function getFormattedTimestamp() {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  const localDate = new Date(currentDate.getTime() - (timezoneOffset * 60000));
  return localDate.toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS" 형식
}