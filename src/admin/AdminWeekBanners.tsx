import { useState } from "react";
import { getFile, commitFile, commitBinaryFile, fileToBase64, getFileShaIfExists } from "@/admin/github";
import {
  findArrayRange,
  isEntryLine,
  parseLineKV,
  normalizeEmptyArray,
  upsertLine,
  upsertImportLine,
} from "@/admin/lines";
import AdminSaveError from "@/admin/AdminSaveError";
import { games } from "@/data/schedule";

const PATH = "src/data/weekBanners.ts";
const MARKER = "export const weekBanners";
const MAX_BYTES = 5 * 1024 * 1024; // 5MB — plenty for a banner, keeps the API call fast

const weeks = Array.from(new Set(games.map((g) => g.week))).sort((a, b) => a - b);

export default function AdminWeekBanners() {
  const [week, setWeek] = useState(weeks[0] ?? 1);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const retry = () => {
    setUploadError(null);
  };

  const upload = async () => {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setUploadError(`That file is too big (${(file.size / 1024 / 1024).toFixed(1)}MB) — keep it under 5MB.`);
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const varName = `week${week}Banner`;
      const assetPath = `src/assets/week-banners/week-${week}.${ext}`;
      const importPath = `@/assets/week-banners/week-${week}.${ext}`;

      // 1. Upload the image itself.
      const base64 = await fileToBase64(file);
      const existingSha = await getFileShaIfExists(assetPath);
      await commitBinaryFile(
        assetPath,
        base64,
        existingSha ?? undefined,
        `${existingSha ? "Update" : "Add"} Week ${week} banner`,
      );

      // 2. Wire it into weekBanners.ts: add/update the import, then set or
      // insert the entry for this week. Re-find/re-range after the import
      // edit since inserting a new import line shifts every line below it
      // down by one.
      const { content, sha } = await getFile(PATH);
      let lines = normalizeEmptyArray(content.split("\n"), MARKER);
      lines = upsertImportLine(lines, varName, importPath);

      const { start, end } = findArrayRange(lines, MARKER);
      let lineIndex = -1;
      for (let i = start + 1; i < end; i++) {
        if (!isEntryLine(lines[i])) continue;
        if (parseLineKV(lines[i]).week === week) {
          lineIndex = i;
          break;
        }
      }
      const newLine = `  { week: ${week}, banner: ${varName} },`;
      const nextLines = upsertLine(lines, lineIndex, newLine, (kv) => (kv.week as number) < week, start, end);

      await commitFile(PATH, nextLines.join("\n"), sha, `Set Week ${week} banner`);

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
        Upload a banner image for a week — it shows above that week's games on the public Schedule
        page instead of a plain "WEEK N" header. Re-uploading for the same week replaces the existing
        banner.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={week}
          onChange={(e) => setWeek(Number(e.target.value))}
          className="border border-line bg-bg-1 px-3 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
        >
          {weeks.map((w) => (
            <option key={w} value={w}>
              WEEK {w}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm text-ink-2 file:mr-3 file:border file:border-line file:bg-bg-1 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ink-0"
        />
        <button
          type="button"
          onClick={upload}
          disabled={!file || uploading}
          className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {uploading ? "UPLOADING…" : uploaded ? "UPLOADED ✓" : "UPLOAD BANNER"}
        </button>
      </div>
      {uploadError && <AdminSaveError error={uploadError} onRetry={retry} className="mt-3" />}
    </div>
  );
}
