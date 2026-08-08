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

// 1 -> "1st", 4 -> "4th", 11 -> "11th", 22 -> "22nd"
export const formatOrdinal = (n: number): string => {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};

// "Carsonreeves" -> "carsonreeves", "Adam Cole" -> "adam-cole"
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const isSameDate = (iso: string, date: Date): boolean => {
  const parsed = parseIsoDate(iso);
  return (
    parsed.getFullYear() === date.getFullYear() &&
    parsed.getMonth() === date.getMonth() &&
    parsed.getDate() === date.getDate()
  );
};
