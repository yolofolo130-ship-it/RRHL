import type { StaffMember } from "./types";

import chrisxAvatar from "@/assets/staff/Chrisx.webp";
import tgodAvatar from "@/assets/staff/TGOD.webp";
import carterthegawdAvatar from "@/assets/staff/Carterthegawd.webp";
import siahAvatar from "@/assets/staff/Siah.png";
import vengeanaceAvatar from "@/assets/staff/Vengeance.webp";
import boolitAvatar from "@/assets/staff/Boolit.webp";
import sparklesAvatar from "@/assets/staff/Sparkles.webp";
import cronAvatar from "@/assets/staff/Cron.webp";
import swordAvatar from "@/assets/staff/Sword.webp";
import nickelAvatar from "@/assets/staff/Nickel.webp";
import lilballerjimmyAvatar from "@/assets/staff/lilballerjimmy.webp";
import fullAvatar from "@/assets/staff/Full.webp";
import calebisgodAvatar from "@/assets/staff/Calebisgod.webp";
import snugThePugAvatar from "@/assets/staff/SnugThePug-Staff.webp";
import sidAvatar from "@/assets/staff/Sid-Staff.webp";
import yaBoiCurryAvatar from "@/assets/staff/YaBoiCurry-Staff.webp";
import wapwAvatar from "@/assets/staff/Wapw-Staff.webp";
import meshAvatar from "@/assets/staff/Mesh-Staff.png";

// Placeholder league staff — replace names/roles/discord handles at any time.
export const staff: StaffMember[] = [
  { id: "s0", name: "Sinny", role: "Website Developer", category: "Website Developer", discord: "@sinnysahur" },

  { id: "s1", name: "Chrisx", role: "Commissioner", category: "Commissioner", discord: "@chrisxistuff", avatar: chrisxAvatar },

  { id: "s2", name: "TGOD", role: "Co Commissioner", category: "Co Commissioners & League Director", discord: "@tgod_0418", avatar: tgodAvatar },
  { id: "s3", name: "Carterthegawd", role: "Co Commissioner", category: "Co Commissioners & League Director", discord: "@carterthagawd99", avatar: carterthegawdAvatar },
  { id: "s4", name: "Siah", role: "League Director", category: "Co Commissioners & League Director", discord: "@inndiie", avatar: siahAvatar },

  { id: "s5", name: "Vengeanace", role: "League Manager", category: "League Manager and Head of Board of Directors", discord: "@im_vengeance", avatar: vengeanaceAvatar },
  { id: "s7", name: "Sparkles", role: "League Manager", category: "League Manager and Head of Board of Directors", discord: "@randyiskewl", avatar: sparklesAvatar },
  { id: "s8", name: "Cron", role: "Head of Board of Directors", category: "League Manager and Head of Board of Directors", discord: "@lazy_cron", avatar: cronAvatar },

  { id: "s9", name: "Sword", role: "Board of Director", category: "Board of Directors", discord: "@swordtsu", avatar: swordAvatar },
  { id: "s10", name: "Nickel", role: "Board of Director", category: "Board of Directors", discord: "@nickelplated9", avatar: nickelAvatar },

  { id: "s11", name: "lilballerjimmy", role: "Staff Team", category: "RRHL Staff Team", discord: "@lilballerjimmy", avatar: lilballerjimmyAvatar },
  { id: "s12", name: "Full", role: "Staff Team", category: "RRHL Staff Team", discord: "@fulliy", avatar: fullAvatar },
  { id: "s13", name: "Calebisgod", role: "Staff Team", category: "RRHL Staff Team", discord: "@calebisgodv2", avatar: calebisgodAvatar },
  { id: "s6", name: "Boolit", role: "Staff Team", category: "RRHL Staff Team", discord: "@hornyhoodironynigga12", avatar: boolitAvatar },
  { id: "s14", name: "SnugThePug", role: "Staff Team", category: "RRHL Staff Team", discord: "@snug3.0", avatar: snugThePugAvatar },
  { id: "s15", name: "Sid", role: "Staff Team", category: "RRHL Staff Team", discord: "@sovietunionforever.", avatar: sidAvatar },
  { id: "s16", name: "YaBoiCurry", role: "Staff Team", category: "RRHL Staff Team", discord: "@yaboicurry1", avatar: yaBoiCurryAvatar },
  { id: "s17", name: "Wapw", role: "Staff Team", category: "RRHL Staff Team", discord: "@wapw_3", avatar: wapwAvatar },
  { id: "s18", name: "Mesh", role: "Staff Team", category: "RRHL Staff Team", discord: "@miraahje", avatar: meshAvatar },
];

export const staffCategoryOrder = [
  "Website Developer",
  "Commissioner",
  "Co Commissioners & League Director",
  "League Manager and Head of Board of Directors",
  "Board of Directors",
  "RRHL Staff Team",
] as const;
