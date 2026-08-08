// "Season 12" > "Season 9" numerically but not alphabetically — sort by the
// number, not the string, so history doesn't scramble once seasons hit
// double digits.
const seasonNumber = (season: string): number => parseInt(season.replace(/\D/g, ""), 10) || 0;

export const byNewestSeason = <T extends { season: string }>(a: T, b: T): number =>
  seasonNumber(b.season) - seasonNumber(a.season);

export const byOldestSeason = <T extends { season: string }>(a: T, b: T): number =>
  seasonNumber(a.season) - seasonNumber(b.season);
