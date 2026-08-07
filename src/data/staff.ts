import type { StaffMember } from "./types";

// Placeholder league staff — replace names/roles/discord handles at any time.
export const staff: StaffMember[] = [
  { id: "s1", name: "Chrisx", role: "Commissioner", category: "Commissioner", discord: "@chrisxistuff" },

  { id: "s2", name: "TGOD", role: "Co Commissioner", category: "League Management", discord: "@tgod_0418" },
  { id: "s3", name: "Carterthegawd", role: "Co Commissioner", category: "League Management", discord: "@carterthagawd99" },
  { id: "s4", name: "Siah", role: "League Director", category: "League Management", discord: "@inndiie" },

  { id: "s5", name: "Vengeanace", role: "League Manager", category: "Game Operations", discord: "@im_vengeance" },
  { id: "s6", name: "Boolit", role: "League Manager", category: "Game Operations", discord: "@hornyhoodironynigga12" },
  { id: "s7", name: "Sparkles", role: "Head of Board of Directors", category: "Game Operations", discord: "@randyiskewl" },
  { id: "s8", name: "Cron", role: "Head of Board of Directors", category: "Game Operations", discord: "@lazy_cron" },
 
  { id: "s9", name: "Sword", role: "Board of Director", category: "Board of Directors", discord: "@swordtsu" },
  { id: "s10", name: "Nickel", role: "Board of Director", category: "Board of Directors", discord: "@nickelplated9" },

  { id: "s11", name: "lilballerjimmy", role: "Staff Team", category: "Moderation", discord: "@lilballerjimmy" },
  { id: "s12", name: "Full", role: "Staff Team", category: "Moderation", discord: "@dkaine" },
  { id: "s13", name: "Calebisgod", role: "Staff Team", category: "Moderation", discord: "@calebisgodv2" },
];

export const staffCategoryOrder = [
  "Commissioner",
  "League Management",
  "Game Operations",
  "Board of Directors",
  "Moderation",
] as const;
