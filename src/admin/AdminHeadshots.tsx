import { useMemo, useState } from "react";
import { getFile, commitFile, commitBinaryFile, fileToBase64, getFileShaIfExists } from "@/admin/github";
import { findArrayRange, isEntryLine, parseLineKV, setLineFieldRaw, upsertImportLine } from "@/admin/lines";
import AdminSaveError from "@/admin/AdminSaveError";
import { teams } from "@/data/teams";
import { skaters, goalies } from "@/data/players";

const PATH = "src/data/players.ts";
const MAX_BYTES = 5 * 1024 * 1024; // 5MB — plenty for a headshot, keeps the API call fast

export default function AdminHeadshots() {
  const [teamId, setTeamId] = useState(teams[0]?.id ?? "");
  const [playerId, setPlayerId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const teamPlayers = useMemo(() => {
    const s = skaters.filter((p) => p.teamId === teamId).map((p) => ({ ...p, kind: "skater" as const }));
    const g = goalies.filter((p) => p.teamId === teamId).map((p) => ({ ...p, kind: "goalie" as const }));
    return [...s, ...g];
  }, [teamId]);

  const currentPlayerId = playerId || teamPlayers[0]?.id || "";
  const currentPlayer = teamPlayers.find((p) => p.id === currentPlayerId);

  const retry = () => {
    setUploadError(null);
  };

  const upload = async () => {
    if (!file || !currentPlayer) return;
    if (file.size > MAX_BYTES) {
      setUploadError(`That file is too big (${(file.size / 1024 / 1024).toFixed(1)}MB) — keep it under 5MB.`);
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const idSafe = currentPlayer.id.replace(/[^a-zA-Z0-9]/g, "");
      const varName = `${idSafe}Headshot`;
      const assetPath = `src/assets/players-avatars/${currentPlayer.id}.${ext}`;
      const importPath = `@/assets/players-avatars/${currentPlayer.id}.${ext}`;

      // 1. Upload the image itself.
      const base64 = await fileToBase64(file);
      const existingSha = await getFileShaIfExists(assetPath);
      await commitBinaryFile(
        assetPath,
        base64,
        existingSha ?? undefined,
        `${existingSha ? "Update" : "Add"} headshot for ${currentPlayer.name}`,
      );

      // 2. Wire it into players.ts: add/update the import, then point the
      // player's line at it. Re-find the line after the import edit since
      // inserting a new import line shifts every line below it down by one.
      const { content, sha } = await getFile(PATH);
      let lines = content.split("\n");
      lines = upsertImportLine(lines, varName, importPath);

      const marker = currentPlayer.kind === "skater" ? "export const skaters" : "export const goalies";
      const { start, end } = findArrayRange(lines, marker);
      let lineIndex = -1;
      for (let i = start + 1; i < end; i++) {
        if (!isEntryLine(lines[i])) continue;
        if (parseLineKV(lines[i]).id === currentPlayer.id) {
          lineIndex = i;
          break;
        }
      }
      if (lineIndex === -1) throw new Error(`Couldn't find ${currentPlayer.name}'s line after the import edit.`);
      lines[lineIndex] = setLineFieldRaw(lines[lineIndex], "headshot", varName);

      await commitFile(PATH, lines.join("\n"), sha, `Set headshot for ${currentPlayer.name}`);

      setUploaded(true);
      setFile(null);
      setTimeout(() => setUploaded(false), 2500);
    } catch (e: any) {
      setUploadError(String(e.message ?? e));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <p className="mb-4 max-w-2xl text-sm text-ink-2">
        Upload a photo for a player's profile page. Re-uploading for the same player replaces their
        existing headshot.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={teamId}
          onChange={(e) => {
            setTeamId(e.target.value);
            setPlayerId("");
          }}
          className="border border-line bg-bg-1 px-3 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
        >
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          value={currentPlayerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="border border-line bg-bg-1 px-3 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
        >
          {teamPlayers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.kind === "skater" ? "Skater" : "Goalie"})
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm text-ink-2 file:mr-3 file:border file:border-line file:bg-bg-1 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ink-0"
        />
        <button
          type="button"
          onClick={upload}
          disabled={!file || !currentPlayer || uploading}
          className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {uploading ? "UPLOADING…" : uploaded ? "UPLOADED ✓" : "UPLOAD HEADSHOT"}
        </button>
      </div>
      {uploadError && <AdminSaveError error={uploadError} onRetry={retry} className="mt-3" />}
    </div>
  );
}
