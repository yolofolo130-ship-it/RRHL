import type { FormerPlayer } from "./types";

// People who appear in season history/accolades but aren't on a current
// roster (players.ts). Add an entry here before referencing their name in
// playerHistory.ts, so their history has somewhere to link to.
export const formerPlayers: FormerPlayer[] = [
  { id: "fp-carsonreeves", name: "Carsonreeves" },
  { id: "fp-krampuz", name: "Krampuz" },
  { id: "fp-minisneaki", name: "MiniSneaki" },
  { id: "fp-landorito", name: "Landorito" },
  { id: "fp-bakedlasgna", name: "BakedLasgna" },
];

export const getFormerPlayerById = (id: string): FormerPlayer | undefined =>
  formerPlayers.find((p) => p.id === id);
