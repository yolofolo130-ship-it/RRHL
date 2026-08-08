import type { FormerPlayer } from "./types";

// People who appear in season history/accolades but aren't on a current
// roster (players.ts). Add an entry here before referencing their name in
// playerHistory.ts, so their history has somewhere to link to.
export const formerPlayers: FormerPlayer[] = [
  { id: "fp-krampuz", name: "Krampuz" },
  { id: "fp-minisneaki", name: "MiniSneaki" },
  { id: "fp-landorito", name: "Landorito" },
  { id: "fp-bakedlasgna", name: "BakedLasgna" },
  { id: "fp-b3nn3tt1", name: "B3NN3TT1" },
  { id: "fp-flaganoid", name: "Flaganoid" },
  { id: "fp-max00x", name: "Max00x" },
  { id: "fp-alexomegavr", name: "ALEXOMEGAVR" },
  { id: "fp-stefonb", name: "StefonB" },
  { id: "fp-carber", name: "Carber" },
  { id: "fp-ricey", name: "Ricey" },
  { id: "fp-zac", name: "Zac" },
  { id: "fp-swizzy", name: "Swizzy" },
  { id: "fp-narcissist", name: "Narcissist" },
  { id: "fp-saxophone", name: "Saxophone" },
  { id: "fp-claymore", name: "Claymore" },
  { id: "fp-prim", name: "Prim" },
  { id: "fp-carnage", name: "Carnage" },
  { id: "fp-jonjon", name: "jonjon" },
  { id: "fp-zeke", name: "Zeke" },
  { id: "fp-hockey-boi", name: "Hockey Boi" },
  { id: "fp-sane", name: "Sane" },
  { id: "fp-nicklas", name: "Nicklas" },
  { id: "fp-airdawg", name: "Airdawg" },
  { id: "fp-pechs", name: "Pechs" },
  { id: "fp-luh-dj", name: "Luh DJ" },
  { id: "fp-jj", name: "JJ" },
  { id: "fp-birbman", name: "Birbman" },
  { id: "fp-dxrk", name: "Dxrk" },
  { id: "fp-cheddar", name: "Cheddar" },
  { id: "fp-therupist", name: "therupist" },
  { id: "fp-repent", name: "Repent" },
  { id: "fp-beasty", name: "Beasty" },
];

export const getFormerPlayerById = (id: string): FormerPlayer | undefined =>
  formerPlayers.find((p) => p.id === id);

export const getFormerPlayerByName = (name: string): FormerPlayer | undefined =>
  formerPlayers.find((p) => p.name === name);
