const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

// Dates are stored as plain "YYYY-MM-DD" strings; parse as local, not UTC,
// so games don't shift a day depending on the viewer's timezone.
const parseIsoDate = (iso: string): Date => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatShortDate = (iso: string): string =>
  shortDateFormatter.format(parseIsoDate(iso)).toUpperCase();

export const formatLongDate = (iso: string): string =>
  longDateFormatter.format(parseIsoDate(iso));

export const isSameDate = (iso: string, date: Date): boolean => {
  const parsed = parseIsoDate(iso);
  return (
    parsed.getFullYear() === date.getFullYear() &&
    parsed.getMonth() === date.getMonth() &&
    parsed.getDate() === date.getDate()
  );
};
