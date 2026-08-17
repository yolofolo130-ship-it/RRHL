import { useEffect, useMemo, useState } from "react";
import { getFile, commitFile, commitBinaryFile, fileToBase64, getFileShaIfExists } from "@/admin/github";
import {
  findArrayRange,
  isEntryLine,
  parseLineKV,
  normalizeEmptyArray,
  setLineFieldText,
  setLineFieldRaw,
  getLineFieldText,
  upsertImportLine,
  stringifyNewNewsPostLine,
  nextIdNumber,
} from "@/admin/lines";
import AdminSaveError from "@/admin/AdminSaveError";
import { games } from "@/data/schedule";
import { getTeamById } from "@/data/teams";
import type { Game } from "@/data/types";

const PATH = "src/data/news.ts";
const MARKER = "export const newsPosts";
const MAX_BYTES = 5 * 1024 * 1024;

interface Row {
  lineIndex: number;
  id: string;
  date: string;
  title: string;
  body: string;
  sourceKey?: string;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function gameSourceKey(gameId: string): string {
  return `game:${gameId}`;
}

// A player's stat card in Schedule's own "GAME STATS" section already
// covers detailed per-player logging — this is just a quick recap draft
// the admin can rewrite entirely before publishing, not a source of truth.
function draftForGame(game: Game): { title: string; body: string } {
  const away = getTeamById(game.awayTeamId);
  const home = getTeamById(game.homeTeamId);
  const awayName = away?.name ?? game.awayTeamId;
  const homeName = home?.name ?? game.homeTeamId;
  const awayScore = game.awayScore ?? 0;
  const homeScore = game.homeScore ?? 0;
  const winner = awayScore > homeScore ? awayName : homeName;
  const title = `${awayName} @ ${homeName} — Final`;
  let body = `${awayName} ${awayScore}, ${homeName} ${homeScore}${game.overtime ? " (OT)" : ""}. ${winner} take it.`;
  if (game.potg) body += ` Player of the game: ${game.potg}.`;
  return { title, body };
}

function imageVarForId(id: string): string {
  return `newsImg${id.replace(/\D/g, "")}`;
}

async function uploadImageAndGetVar(
  id: string,
  file: File,
): Promise<{ varName: string; importPath: string }> {
  if (file.size > MAX_BYTES) {
    throw new Error(`That image is too big (${(file.size / 1024 / 1024).toFixed(1)}MB) — keep it under 5MB.`);
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const assetPath = `src/assets/news/${id}.${ext}`;
  const importPath = `@/assets/news/${id}.${ext}`;
  const base64 = await fileToBase64(file);
  const existingSha = await getFileShaIfExists(assetPath);
  await commitBinaryFile(assetPath, base64, existingSha ?? undefined, `Add image for news post ${id}`);
  return { varName: imageVarForId(id), importPath };
}

function ImagePicker({ file, onChange }: { file: File | null; onChange: (f: File | null) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold tracking-[0.15em] text-ink-3">PHOTO (OPTIONAL)</span>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className="text-xs text-ink-2 file:mr-3 file:border file:border-line file:bg-bg-1 file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-ink-0"
      />
      {file && <span className="text-[10px] text-ink-3">{file.name}</span>}
    </label>
  );
}

export default function AdminNews() {
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setLoadError(null);
    getFile(PATH)
      .then(({ content, sha }) => {
        const normalized = normalizeEmptyArray(content.split("\n"), MARKER);
        const { start, end } = findArrayRange(normalized, MARKER);
        const parsed: Row[] = [];
        for (let i = start + 1; i < end; i++) {
          if (!isEntryLine(normalized[i])) continue;
          const kv = parseLineKV(normalized[i]);
          parsed.push({
            lineIndex: i,
            id: kv.id as string,
            date: kv.date as string,
            title: getLineFieldText(normalized[i], "title") ?? "",
            body: getLineFieldText(normalized[i], "body") ?? "",
            sourceKey: kv.sourceKey as string | undefined,
          });
        }
        setLines(normalized);
        setSha(sha);
        setRows(parsed);
      })
      .catch((e) => setLoadError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const postedGameKeys = useMemo(
    () => new Set(rows.map((r) => r.sourceKey).filter((k): k is string => Boolean(k))),
    [rows],
  );

  const suggestions = useMemo(
    () =>
      games
        .filter((g) => g.status === "final" && !postedGameKeys.has(gameSourceKey(g.id)))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [postedGameKeys],
  );

  if (loading) return <p className="text-sm text-ink-2">Loading news…</p>;
  if (loadError) return <AdminSaveError error={loadError} onRetry={load} />;
  if (!lines || sha === null) return <p className="text-sm text-ink-2">Loading news…</p>;

  return (
    <div className="flex flex-col gap-10">
      {suggestions.length > 0 && (
        <section>
          <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-ink-2">
            SUGGESTED POSTS ({suggestions.length})
          </p>
          <p className="mb-3 text-xs text-ink-3">
            Drafted from games that just went final. Edit before publishing, or ignore — they'll stay
            here until you publish or the game is unfinaled.
          </p>
          <div className="flex flex-col gap-4">
            {suggestions.map((game) => (
              <SuggestionCard key={game.id} game={game} lines={lines} sha={sha} onSaved={load} />
            ))}
          </div>
        </section>
      )}

      <section>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">WRITE A POST</p>
        <NewPostForm lines={lines} sha={sha} onSaved={load} />
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">
          ALL POSTS ({rows.length})
        </p>
        {rows.length === 0 ? (
          <p className="text-sm text-ink-2">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {[...rows]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((row) => (
                <ExistingPostCard key={row.id} row={row} lines={lines} sha={sha} onSaved={load} />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

function SuggestionCard({
  game,
  lines,
  sha,
  onSaved,
}: {
  game: Game;
  lines: string[];
  sha: string;
  onSaved: () => void;
}) {
  const draft = draftForGame(game);
  const [title, setTitle] = useState(draft.title);
  const [body, setBody] = useState(draft.body);
  const [file, setFile] = useState<File | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = async () => {
    if (!title.trim() || !body.trim()) return;
    setPublishing(true);
    setError(null);
    try {
      const { start, end } = findArrayRange(lines, MARKER);
      const n = nextIdNumber(lines, start, end, /^n(\d+)$/);
      const id = `n${n}`;

      let workingLines = lines;
      let imageVar: string | undefined;
      if (file) {
        const { varName, importPath } = await uploadImageAndGetVar(id, file);
        imageVar = varName;
        workingLines = upsertImportLine(workingLines, imageVar, importPath);
      }

      const range = findArrayRange(workingLines, MARKER);
      const newLine = stringifyNewNewsPostLine({
        id,
        date: game.date,
        title: title.trim(),
        body: body.trim(),
        image: imageVar,
        sourceKey: gameSourceKey(game.id),
      });
      const nextLines = [...workingLines];
      nextLines.splice(range.end, 0, newLine);

      await commitFile(PATH, nextLines.join("\n"), sha, `Add news post: ${title.trim()}`);
      onSaved();
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="border border-dashed border-line bg-bg-1/50 p-4">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.1em] text-ink-3">
        Week {game.week} &middot; {game.date}
      </p>
      <div className="flex flex-col gap-3">
        <Field label="TITLE">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </Field>
        <Field label="BODY">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="w-full border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </Field>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <ImagePicker file={file} onChange={setFile} />
          <button
            type="button"
            onClick={publish}
            disabled={publishing || !title.trim() || !body.trim()}
            className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {publishing ? "PUBLISHING…" : "PUBLISH"}
          </button>
        </div>
        {error && <AdminSaveError error={error} onRetry={() => setError(null)} />}
      </div>
    </div>
  );
}

function NewPostForm({ lines, sha, onSaved }: { lines: string[]; sha: string; onSaved: () => void }) {
  const [date, setDate] = useState(todayIso());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = async () => {
    if (!title.trim() || !body.trim() || !date) return;
    setPublishing(true);
    setError(null);
    try {
      const { start, end } = findArrayRange(lines, MARKER);
      const n = nextIdNumber(lines, start, end, /^n(\d+)$/);
      const id = `n${n}`;

      let workingLines = lines;
      let imageVar: string | undefined;
      if (file) {
        const { varName, importPath } = await uploadImageAndGetVar(id, file);
        imageVar = varName;
        workingLines = upsertImportLine(workingLines, imageVar, importPath);
      }

      const range = findArrayRange(workingLines, MARKER);
      const newLine = stringifyNewNewsPostLine({
        id,
        date,
        title: title.trim(),
        body: body.trim(),
        image: imageVar,
      });
      const nextLines = [...workingLines];
      nextLines.splice(range.end, 0, newLine);

      await commitFile(PATH, nextLines.join("\n"), sha, `Add news post: ${title.trim()}`);
      setTitle("");
      setBody("");
      setFile(null);
      onSaved();
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 border border-line bg-bg-2 p-5">
      <div className="flex flex-wrap gap-3">
        <Field label="DATE">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </Field>
      </div>
      <Field label="TITLE">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Headline"
          className="w-full border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        />
      </Field>
      <Field label="BODY">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="What happened…"
          className="w-full border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        />
      </Field>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <ImagePicker file={file} onChange={setFile} />
        <button
          type="button"
          onClick={publish}
          disabled={publishing || !title.trim() || !body.trim() || !date}
          className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {publishing ? "PUBLISHING…" : "PUBLISH POST"}
        </button>
      </div>
      {error && <AdminSaveError error={error} onRetry={() => setError(null)} />}
    </div>
  );
}

function ExistingPostCard({
  row,
  lines,
  sha,
  onSaved,
}: {
  row: Row;
  lines: string[];
  sha: string;
  onSaved: () => void;
}) {
  const [date, setDate] = useState(row.date);
  const [title, setTitle] = useState(row.title);
  const [body, setBody] = useState(row.body);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!title.trim() || !body.trim() || !date) return;
    setSaving(true);
    setError(null);
    try {
      let workingLines = lines;
      let imageVar: string | undefined;
      if (file) {
        const { varName, importPath } = await uploadImageAndGetVar(row.id, file);
        imageVar = varName;
        workingLines = upsertImportLine(workingLines, imageVar, importPath);
      }

      // Re-find this post's line by id rather than trusting row.lineIndex —
      // an import insertion above shifts every line below it down by one.
      const { start, end } = findArrayRange(workingLines, MARKER);
      let targetIndex = -1;
      for (let i = start + 1; i < end; i++) {
        if (!isEntryLine(workingLines[i])) continue;
        if (parseLineKV(workingLines[i]).id === row.id) {
          targetIndex = i;
          break;
        }
      }
      if (targetIndex === -1) throw new Error("Couldn't find this post after the image import edit.");

      let newLine = setLineFieldText(workingLines[targetIndex], "title", title.trim());
      newLine = setLineFieldText(newLine, "body", body.trim());
      newLine = setLineFieldText(newLine, "date", date);
      if (imageVar) newLine = setLineFieldRaw(newLine, "image", imageVar);

      const nextLines = [...workingLines];
      nextLines[targetIndex] = newLine;

      await commitFile(PATH, nextLines.join("\n"), sha, `Update news post: ${title.trim()}`);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSaved();
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-line bg-bg-2 p-4">
      {row.sourceKey && (
        <p className="mb-2 text-[10px] font-semibold tracking-[0.15em] text-amber-400">
          FROM {row.sourceKey.toUpperCase()}
        </p>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          <Field label="DATE">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
            />
          </Field>
        </div>
        <Field label="TITLE">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </Field>
        <Field label="BODY">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="w-full border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </Field>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <ImagePicker file={file} onChange={setFile} />
          <button
            type="button"
            onClick={save}
            disabled={saving || !title.trim() || !body.trim() || !date}
            className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "SAVING…" : saved ? "SAVED ✓" : "SAVE"}
          </button>
        </div>
        {error && <AdminSaveError error={error} onRetry={() => setError(null)} />}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-1 flex-col gap-1">
      <span className="text-[10px] font-semibold tracking-[0.15em] text-ink-3">{label}</span>
      {children}
    </label>
  );
}
