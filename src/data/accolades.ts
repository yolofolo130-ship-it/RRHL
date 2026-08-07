import type { Accolade } from "./types";

// League end-of-season awards. `winner` is left blank until assigned — add
// it directly to an entry once decided, e.g.:
// { id: "hart-memorial-trophy", name: "Hart Memorial Trophy", winner: "Chrisx" },
export const accolades: Accolade[] = [
  { id: "stanley-cup-mvp", name: "Stanley Cup MVP" },
  { id: "stanley-cup-losing-mvp", name: "Stanley Cup Losing MVP" },
  { id: "presidents-trophy", name: "President's Trophy" },
  { id: "prince-of-wales-trophy", name: "Prince Of Wales Trophy" },
  { id: "clarence-s-campbell-trophy", name: "Clarence S. Campbell Trophy" },
  { id: "conn-smythe-trophy", name: "Conn Smythe Trophy" },
  { id: "vezina-trophy", name: "Vezina Trophy" },
  { id: "ted-lindsay-trophy", name: "Ted Lindsay Trophy" },
  { id: "rrhl-foundation-trophy", name: "RRHL Foundation Trophy" },
  { id: "lady-byng-memorial-trophy", name: "Lady Byng Memorial Trophy" },
  { id: "james-norris-trophy", name: "James Norris Trophy" },
  { id: "hart-memorial-trophy", name: "Hart Memorial Trophy" },
  { id: "maurice-rocket-richard-trophy", name: "Maurice \"Rocket\" Richard Trophy" },
  { id: "art-ross-trophy", name: "Art Ross Trophy" },
  { id: "calder-trophy", name: "Calder Trophy" },
  { id: "jack-adams-trophy", name: "Jack Adams Trophy" },
];
