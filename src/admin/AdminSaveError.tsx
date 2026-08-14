interface AdminSaveErrorProps {
  error: string;
  onRetry: () => void;
  className?: string;
}

// GitHub's Contents API returns a 409 when the file changed since this tab
// loaded it (someone else saved first) — previously that dumped the raw
// "GitHub API 409 Conflict: {...}" JSON at the user with no way forward
// but a manual page refresh. Recognize that specific case and offer a
// one-click reload instead; anything else still shows the raw message,
// since those are genuinely unexpected and worth seeing in full.
export default function AdminSaveError({ error, onRetry, className = "" }: AdminSaveErrorProps) {
  const isConflict = error.includes("409");

  if (!isConflict) {
    return <p className={`text-xs text-red-400 ${className}`}>{error}</p>;
  }

  return (
    <p className={`flex flex-wrap items-center gap-2 text-xs text-red-400 ${className}`}>
      <span>Someone else saved changes here since this page loaded.</span>
      <button
        type="button"
        onClick={onRetry}
        className="border border-red-400/40 px-2 py-1 text-[11px] font-semibold tracking-[0.1em] text-red-300 transition-colors hover:bg-red-400/10"
      >
        REFRESH &amp; RETRY
      </button>
    </p>
  );
}
