export interface NewsPost {
  id: string;
  date: string; // ISO date
  title: string;
  body: string;
  /** Imported image, if the post has one. */
  image?: string;
  /**
   * Ties an auto-suggested post (e.g. a final-game recap) back to its
   * source so the admin panel doesn't keep re-suggesting it once
   * published — e.g. "game:g05". Absent on a fully hand-written post.
   */
  sourceKey?: string;
}

// League news feed — managed from the admin panel's News tab, which can
// both auto-suggest posts (from newly-final games) and take fully manual
// ones with an optional photo. Newest should stay at the bottom; pages
// that render this sort by date themselves.
export const newsPosts: NewsPost[] = [];
