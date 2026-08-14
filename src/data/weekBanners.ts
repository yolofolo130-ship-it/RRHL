export interface WeekBanner {
  week: number;
  /** Banner image for this week, imported directly from src/assets/week-banners/. */
  banner: string;
}

// Populated via the admin panel's Week Banners tab — one entry per week that
// has a banner image uploaded. Weeks without an entry here just get a plain
// text "WEEK N" header on the Schedule page instead.
export const weekBanners: WeekBanner[] = [];
