import type { StaffMember } from "./types";

import chrisxAvatar from "@/assets/staff/Chrisx.png";
import tgodAvatar from "@/assets/staff/TGOD.png";
import carterthegawdAvatar from "@/assets/staff/Carterthegawd.png";
import siahAvatar from "@/assets/staff/Siah.png";
import vengeanaceAvatar from "@/assets/staff/Vengeance.png";
import boolitAvatar from "@/assets/staff/Boolit.png";
import sparklesAvatar from "@/assets/staff/Sparkles.png";
import cronAvatar from "@/assets/staff/Cron.png";
import swordAvatar from "@/assets/staff/Sword.png";
import nickelAvatar from "@/assets/staff/Nickel.png";
import lilballerjimmyAvatar from "@/assets/staff/lilballerjimmy.png";
import fullAvatar from "@/assets/staff/Full.png";
import calebisgodAvatar from "@/assets/staff/Calebisgod.png";

// Placeholder league staff — replace names/roles/discord handles at any time.
export const staff: StaffMember[] = [
  { id: "s1", name: "Chrisx", role: "Commissioner", category: "Commissioner", discord: "@chrisxistuff", avatar: chrisxAvatar },

  { id: "s2", name: "TGOD", role: "Co Commissioner", category: "League Management", discord: "@tgod_0418", avatar: tgodAvatar },
  { id: "s3", name: "Carterthegawd", role: "Co Commissioner", category: "League Management", discord: "@carterthagawd99", avatar: carterthegawdAvatar },
  { id: "s4", name: "Siah", role: "League Director", category: "League Management", discord: "@inndiie", avatar: siahAvatar },

  { id: "s5", name: "Vengeanace", role: "League Manager", category: "Game Operations", discord: "@im_vengeance", avatar: vengeanaceAvatar },
  { id: "s6", name: "Boolit", role: "League Manager", category: "Game Operations", discord: "@hornyhoodironynigga12", avatar: boolitAvatar },
  { id: "s7", name: "Sparkles", role: "Head of Board of Directors", category: "Game Operations", discord: "@randyiskewl", avatar: sparklesAvatar },
  { id: "s8", name: "Cron", role: "Head of Board of Directors", category: "Game Operations", discord: "@lazy_cron", avatar: cronAvatar },

  { id: "s9", name: "Sword", role: "Board of Director", category: "Board of Directors", discord: "@swordtsu", avatar: swordAvatar },
  { id: "s10", name: "Nickel", role: "Board of Director", category: "Board of Directors", discord: "@nickelplated9", avatar: nickelAvatar },

  { id: "s11", name: "lilballerjimmy", role: "Staff Team", category: "Moderation", discord: "@lilballerjimmy", avatar: lilballerjimmyAvatar },
  { id: "s12", name: "Full", role: "Staff Team", category: "Moderation", discord: "@dkaine", avatar: fullAvatar },
  { id: "s13", name: "Calebisgod", role: "Staff Team", category: "Moderation", discord: "@calebisgodv2", avatar: calebisgodAvatar },
];

export const staffCategoryOrder = [
  "Commissioner",
  "League Management",
  "Game Operations",
  "Board of Directors",
  "Moderation",
] as const;
