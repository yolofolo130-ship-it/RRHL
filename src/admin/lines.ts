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

// ---------- players.ts roster entries ----------
//
// Rosters have optional fields (overall/xFactor/star/flag) that may or may
// not be present on a given line, plus a `headshot` field on some players
// that's a bare identifier (an imported image), not a primitive — e.g.
// `headshot: sinnyAvatar`. A full rebuild-from-known-fields approach (like
// the schedule/game-log stringifiers above) would silently drop that
// import. So roster edits go through `setLineField` instead: split the
// line into its comma-separated `key: value` tokens, replace/insert/remove
// only the one token being edited, and leave every other token — including
// ones this admin panel doesn't understand — completely untouched.

function splitTopLevelTokens(inner: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (c === '"' && inner[i - 1] !== "\\") inQuotes = !inQuotes;
    if (!inQuotes && c === ",") {
      tokens.push(current.trim());
      current = "";
      continue;
    }
    current += c;
  }
  if (current.trim()) tokens.push(current.trim());
  return tokens;
}

function tokenKey(token: string): string {
  return token.slice(0, token.indexOf(":")).trim();
}

// Splits a `  { ...inner... },` line into its prefix/inner/suffix so the
// inner tokens can be edited and rejoined without disturbing indentation
// or the trailing comma.
function splitEntryLine(line: string): { prefix: string; inner: string; suffix: string } {
  const openIdx = line.indexOf("{");
  const closeIdx = line.lastIndexOf("}");
  if (openIdx === -1 || closeIdx === -1) throw new Error(`Not an object-literal line: ${line}`);
  return {
    prefix: line.slice(0, openIdx + 1) + " ",
    inner: line.slice(openIdx + 1, closeIdx).trim(),
    suffix: " " + line.slice(closeIdx),
  };
}

function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") return `"${value.replace(/"/g, '\\"')}"`;
  return String(value);
}

// Sets (or clears, if `value` is undefined) a single field on an entry
// line, preserving every other token verbatim. New fields are inserted
// right before a trailing `headshot` token if present, otherwise appended
// at the end.
export function setLineField(
  line: string,
  key: string,
  value: string | number | boolean | undefined,
): string {
  const { prefix, inner, suffix } = splitEntryLine(line);
  const tokens = splitTopLevelTokens(inner);
  const existingIndex = tokens.findIndex((t) => tokenKey(t) === key);

  if (value === undefined) {
    if (existingIndex === -1) return line;
    tokens.splice(existingIndex, 1);
    return prefix + tokens.join(", ") + suffix;
  }

  const newToken = `${key}: ${formatValue(value)}`;
  if (existingIndex !== -1) {
    tokens[existingIndex] = newToken;
  } else {
    const headshotIndex = tokens.findIndex((t) => tokenKey(t) === "headshot");
    if (headshotIndex !== -1) tokens.splice(headshotIndex, 0, newToken);
    else tokens.push(newToken);
  }
  return prefix + tokens.join(", ") + suffix;
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
