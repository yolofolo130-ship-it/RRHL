// Reads/writes single-line object-literal entries (the `{ id: "g01", ... },`
// style used throughout src/data/*.ts) without a full JS parser — these
// files are always one flat, primitive-valued object per line, so a small
// key/value scan is enough. Editing means: parse the whole file into lines,
// locate the one line for a given entry, replace it with a freshly
// reconstructed line, and rejoin. Everything else in the file (comments,
// spacing, other entries) is left untouched.

export type KV = Record<string, string | number | boolean>;

const KV_RE = /(\w+):\s*("(?:[^"\\]|\\.)*"|true|false|-?\d+(?:\.\d+)?)/g;

export function parseLineKV(line: string): KV {
  const result: KV = {};
  let m: RegExpExecArray | null;
  KV_RE.lastIndex = 0;
  while ((m = KV_RE.exec(line))) {
    const key = m[1];
    const raw = m[2];
    if (raw === "true") result[key] = true;
    else if (raw === "false") result[key] = false;
    else if (raw.startsWith('"')) result[key] = raw.slice(1, -1);
    else result[key] = Number(raw);
  }
  return result;
}

export function isEntryLine(line: string): boolean {
  return line.trim().startsWith("{");
}

// ---------- schedule.ts games ----------

export interface GameFields {
  id: string;
  week: number;
  date: string;
  time: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  overtime?: boolean;
  status: string;
}

export function stringifyGameLine(f: GameFields): string {
  const parts = [
    `id: "${f.id}"`,
    `week: ${f.week}`,
    `date: "${f.date}"`,
    `time: "${f.time}"`,
    `homeTeamId: "${f.homeTeamId}"`,
    `awayTeamId: "${f.awayTeamId}"`,
  ];
  if (f.homeScore !== undefined) parts.push(`homeScore: ${f.homeScore}`);
  if (f.awayScore !== undefined) parts.push(`awayScore: ${f.awayScore}`);
  if (f.overtime) parts.push(`overtime: true`);
  parts.push(`status: "${f.status}"`);
  return `  { ${parts.join(", ")} },`;
}

// ---------- gameLogs.ts skater stat lines ----------

export interface SkaterStatFields {
  playerName: string;
  gameId: string;
  goals: number;
  assists: number;
  points: number;
  pim: number;
  ppg: number;
  shg: number;
  shots: number;
  shifts: number;
}

export function stringifySkaterStatLine(f: SkaterStatFields): string {
  return `  { playerName: "${f.playerName}", gameId: "${f.gameId}", goals: ${f.goals}, assists: ${f.assists}, points: ${f.points}, pim: ${f.pim}, ppg: ${f.ppg}, shg: ${f.shg}, shots: ${f.shots}, shifts: ${f.shifts} },`;
}

// ---------- gameLogs.ts goalie stat lines ----------

export interface GoalieStatFields {
  playerName: string;
  gameId: string;
  gs: number;
  dec?: "W" | "L" | "OTL";
  shotsAgainst: number;
  goalsAgainst: number;
  pim: number;
}

export function stringifyGoalieStatLine(f: GoalieStatFields): string {
  const parts = [`playerName: "${f.playerName}"`, `gameId: "${f.gameId}"`, `gs: ${f.gs}`];
  if (f.dec) parts.push(`dec: "${f.dec}"`);
  parts.push(`shotsAgainst: ${f.shotsAgainst}`, `goalsAgainst: ${f.goalsAgainst}`, `pim: ${f.pim}`);
  return `  { ${parts.join(", ")} },`;
}

// Finds the [start, end) line-index range of an exported array, given the
// text that opens it (e.g. "export const games: Game[] = ["). `end` points
// at the `];` line itself.
export function findArrayRange(lines: string[], openMarker: string): { start: number; end: number } {
  const start = lines.findIndex((l) => l.includes(openMarker));
  if (start === -1) throw new Error(`Could not find "${openMarker}" in file.`);
  let end = start + 1;
  while (end < lines.length && lines[end].trim() !== "];") end++;
  if (end >= lines.length) throw new Error(`Could not find closing "];" for "${openMarker}".`);
  return { start, end };
}

// ---------- shared line-editing utilities ----------

// Replaces the line at `index`, or if index is -1, inserts a brand new
// line right after the last line belonging to `afterKey`/`afterValue`
// (e.g. the last existing row for a given player), or before `arrayEnd`
// (the `];` line) if that player has no existing lines at all.
export function upsertLine(
  lines: string[],
  existingIndex: number,
  newLine: string,
  insertAfterPredicate: (kv: KV) => boolean,
  arrayEndIndex: number,
): string[] {
  const next = [...lines];
  if (existingIndex >= 0) {
    next[existingIndex] = newLine;
    return next;
  }
  for (let i = arrayEndIndex - 1; i >= 0; i--) {
    if (isEntryLine(next[i]) && insertAfterPredicate(parseLineKV(next[i]))) {
      next.splice(i + 1, 0, newLine);
      return next;
    }
  }
  next.splice(arrayEndIndex, 0, newLine);
  return next;
}
