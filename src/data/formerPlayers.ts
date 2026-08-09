import type { FormerPlayer } from "./types";
import { slugify } from "@/utils/format";

// People who appear in season history/accolades but aren't on a current
// roster (players.ts). Add an entry here before referencing their name in
// playerHistory.ts, so their history has somewhere to link to.
export const formerPlayers: FormerPlayer[] = [
  { id: "fp-krampuz", name: "Krampuz" },
  { id: "fp-minisneaki", name: "MiniSneaki" },
  { id: "fp-landorito", name: "Landorito" },
  { id: "fp-bakedlasgna", name: "BakedLasgna" },
  { id: "fp-b3nn3tt1", name: "B3NN3TT1", overall: 85, flag: "USA" },
  { id: "fp-flaganoid", name: "Flaganoid", overall: 88, star: "One-T", flag: "USA" },
  { id: "fp-max00x", name: "Max00x" },
  { id: "fp-alexomegavr", name: "ALEXOMEGAVR" },
  { id: "fp-carber", name: "Carber" },
  { id: "fp-ricey", name: "Ricey" },
  { id: "fp-swizzy", name: "Swizzy", overall: 75, flag: "USA" },
  { id: "fp-narcissist", name: "Narcissist" },
  { id: "fp-saxophone", name: "Saxophone" },
  { id: "fp-claymore", name: "Claymore" },
  { id: "fp-prim", name: "Prim", overall: 74, flag: "USA" },
  { id: "fp-carnage", name: "Carnage" },
  { id: "fp-jonjon", name: "jonjon" },
  { id: "fp-zeke", name: "Zeke", overall: 84, flag: "USA" },
  { id: "fp-hockey-boi", name: "Hockey Boi", overall: 85, flag: "USA" },
  { id: "fp-sane", name: "Sane", overall: 84, flag: "USA" },
  { id: "fp-nicklas", name: "Nicklas" },
  { id: "fp-airdawg", name: "Airdawg" },
  { id: "fp-luh-dj", name: "Luh DJ" },
  { id: "fp-jj", name: "JJ" },
  { id: "fp-birbman", name: "Birbman" },
  { id: "fp-dxrk", name: "Dxrk", overall: 75, flag: "USA" },
  { id: "fp-cheddar", name: "Cheddar" },
  { id: "fp-therupist", name: "therupist" },
  { id: "fp-repent", name: "Repent", overall: 80, flag: "USA" },
  { id: "fp-beasty", name: "Beasty" },
  { id: "fp-bryce", name: "Bryce" },
  { id: "fp-nexo", name: "Nexo", overall: 79, flag: "USA" },
  { id: "fp-moon", name: "Moon" },
  { id: "fp-emoine", name: "Emoine", overall: 78, flag: "USA" },
  { id: "fp-blaze", name: "Blaze" },
  { id: "fp-david", name: "David" },
  { id: "fp-hitler", name: "Hitler" },
  { id: "fp-slixzz", name: "Slixzz" },
  { id: "fp-wyatt", name: "Wyatt", overall: 73, flag: "USA" },
  { id: "fp-yaboicurry", name: "YaBoiCurry", overall: 86, flag: "USA" },
  { id: "fp-darius", name: "Darius" },
  { id: "fp-evelyn", name: "Evelyn", overall: 81, flag: "USA" },
  { id: "fp-lilcottreau", name: "LiLCottreau", overall: 85, flag: "USA" },
  { id: "fp-k3", name: "K3", overall: 82, flag: "UK" },
  { id: "fp-isagi", name: "Isagi", overall: 78, flag: "USA" },
  { id: "fp-max", name: "Max", overall: 76, flag: "USA" },
  { id: "fp-mcwizard", name: "McWizard", overall: 74, flag: "USA" },
];

export const getFormerPlayerByName = (name: string): FormerPlayer | undefined =>
  formerPlayers.find((p) => p.name === name);

export const getFormerPlayerBySlug = (slug: string): FormerPlayer | undefined =>
  formerPlayers.find((p) => slugify(p.name) === slug);
