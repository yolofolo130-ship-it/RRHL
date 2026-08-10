import type { FormerPlayer } from "./types";
import { slugify } from "@/utils/format";

// People who appear in season history/accolades but aren't on a current
// roster (players.ts). Add an entry here before referencing their name in
// playerHistory.ts, so their history has somewhere to link to.
export const formerPlayers: FormerPlayer[] = [
  { id: "fp-krampuz", name: "Krampuz", flag: "USA" },
  { id: "fp-minisneaki", name: "MiniSneaki", flag: "USA" },
  { id: "fp-landorito", name: "Landorito", flag: "USA" },
  { id: "fp-bakedlasgna", name: "BakedLasgna", flag: "USA" },
  { id: "fp-b3nn3tt1", name: "B3NN3TT1", flag: "USA" },
  { id: "fp-flaganoid", name: "Flaganoid", star: "One-T", flag: "USA" },
  { id: "fp-max00x", name: "Max00x", flag: "USA" },
  { id: "fp-alexomegavr", name: "ALEXOMEGAVR", flag: "USA" },
  { id: "fp-carber", name: "Carber", flag: "USA" },
  { id: "fp-ricey", name: "Ricey", flag: "USA" },
  { id: "fp-swizzy", name: "Swizzy", flag: "USA" },
  { id: "fp-narcissist", name: "Narcissist", flag: "USA" },
  { id: "fp-saxophone", name: "Saxophone", flag: "USA" },
  { id: "fp-claymore", name: "Claymore", flag: "USA" },
  { id: "fp-prim", name: "Prim", flag: "USA" },
  { id: "fp-carnage", name: "Carnage", flag: "USA" },
  { id: "fp-jonjon", name: "jonjon", flag: "USA" },
  { id: "fp-zeke", name: "Zeke", flag: "USA" },
  { id: "fp-hockey-boi", name: "Hockey Boi", flag: "USA" },
  { id: "fp-sane", name: "Sane", flag: "USA" },
  { id: "fp-nicklas", name: "Nicklas", flag: "USA" },
  { id: "fp-airdawg", name: "Airdawg", flag: "USA" },
  { id: "fp-luh-dj", name: "Luh DJ", flag: "USA" },
  { id: "fp-jj", name: "JJ", flag: "USA" },
  { id: "fp-birbman", name: "Birbman", flag: "USA" },
  { id: "fp-dxrk", name: "Dxrk", flag: "USA" },
  { id: "fp-cheddar", name: "Cheddar", flag: "USA" },
  { id: "fp-therupist", name: "therupist", flag: "USA" },
  { id: "fp-repent", name: "Repent", flag: "USA" },
  { id: "fp-beasty", name: "Beasty", flag: "USA" },
  { id: "fp-bryce", name: "Bryce", flag: "USA" },
  { id: "fp-nexo", name: "Nexo", flag: "USA" },
  { id: "fp-moon", name: "Moon", flag: "USA" },
  { id: "fp-emoine", name: "Emoine", flag: "USA" },
  { id: "fp-blaze", name: "Blaze", flag: "USA" },
  { id: "fp-david", name: "David", flag: "USA" },
  { id: "fp-hitler", name: "Hitler", flag: "USA" },
  { id: "fp-slixzz", name: "Slixzz", flag: "USA" },
  { id: "fp-wyatt", name: "Wyatt", flag: "USA" },
  { id: "fp-yaboicurry", name: "YaBoiCurry", flag: "USA" },
  { id: "fp-darius", name: "Darius", flag: "USA" },
  { id: "fp-evelyn", name: "Evelyn", flag: "USA" },
  { id: "fp-lilcottreau", name: "LiLCottreau", flag: "USA" },
  { id: "fp-k3", name: "K3", flag: "UK" },
  { id: "fp-isagi", name: "Isagi", flag: "USA" },
  { id: "fp-max", name: "Max", flag: "USA" },
  { id: "fp-mcwizard", name: "McWizard", flag: "USA" },
];

export const getFormerPlayerByName = (name: string): FormerPlayer | undefined =>
  formerPlayers.find((p) => p.name === name);

export const getFormerPlayerBySlug = (slug: string): FormerPlayer | undefined =>
  formerPlayers.find((p) => slugify(p.name) === slug);
