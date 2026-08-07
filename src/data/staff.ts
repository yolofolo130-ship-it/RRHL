import type { StaffMember } from "./types";

// Placeholder league staff — replace names/roles/discord handles at any time.
export const staff: StaffMember[] = [
  { id: "s1", name: "Marcus Whitfield", role: "Commissioner", category: "Commissioner", discord: "@mwhitfield" },

  { id: "s2", name: "Dana Kessler", role: "Assistant Commissioner", category: "League Management", discord: "@dkessler" },
  { id: "s3", name: "Ryan O'Malley", role: "Franchise Relations", category: "League Management", discord: "@romalley" },
  { id: "s4", name: "Priya Nair", role: "Salary Cap & Rosters", category: "League Management", discord: "@pnair" },

  { id: "s5", name: "Jesse Holt", role: "Head of Game Operations", category: "Game Operations", discord: "@jholt" },
  { id: "s6", name: "Aiden Frost", role: "Scheduling Coordinator", category: "Game Operations", discord: "@afrost" },
  { id: "s7", name: "Morgan Blake", role: "Stats & Scorekeeping", category: "Game Operations", discord: "@mblake" },

  { id: "s8", name: "Talia Ruiz", role: "Media Director", category: "Media", discord: "@truiz" },
  { id: "s9", name: "Corey Danvers", role: "Broadcast & Highlights", category: "Media", discord: "@cdanvers" },

  { id: "s10", name: "Sam Ibarra", role: "Head Moderator", category: "Moderation", discord: "@sibarra" },
  { id: "s11", name: "Devon Kaine", role: "Moderator", category: "Moderation", discord: "@dkaine" },
  { id: "s12", name: "Harlow Reed", role: "Moderator", category: "Moderation", discord: "@hreed" },
];

export const staffCategoryOrder = [
  "Commissioner",
  "League Management",
  "Game Operations",
  "Media",
  "Moderation",
] as const;
