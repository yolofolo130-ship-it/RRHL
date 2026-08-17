import newsImg1 from "@/assets/news/n1.webp";
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
export const newsPosts: NewsPost[] = [
  { id: "n1", date: "2026-08-15", title: "Pittsburgh Penguins @ Los Angeles Kings 4-1 Final", body: "The Penguins Handle Business Against The Kings To Claim Their First Win Of This Western Road Trip.", image: newsImg1, sourceKey: "game:g24" },
];
