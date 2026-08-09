import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import { clearToken, getToken, setToken, verifyToken } from "@/admin/github";
import AdminSchedule from "@/admin/AdminSchedule";
import AdminSkaterLogs from "@/admin/AdminSkaterLogs";
import AdminGoalieLogs from "@/admin/AdminGoalieLogs";
import AdminRosters from "@/admin/AdminRosters";

const TAB_OPTIONS = [
  { value: "schedule", label: "SCHEDULE" },
  { value: "skaters", label: "SKATER LOGS" },
  { value: "goalies", label: "GOALIE LOGS" },
  { value: "rosters", label: "ROSTERS" },
];

export default function Admin() {
  const [login, setLogin] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [tokenInput, setTokenInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [tab, setTab] = useState("schedule");

  useEffect(() => {
    const existing = getToken();
    if (!existing) {
      setChecking(false);
      return;
    }
    verifyToken()
      .then((name) => setLogin(name))
      .catch(() => {
        clearToken();
        setAuthError("Saved token no longer works — sign in again.");
      })
      .finally(() => setChecking(false));
  }, []);

  const handleSignIn = async () => {
    if (!tokenInput.trim()) return;
    setSigningIn(true);
    setAuthError(null);
    setToken(tokenInput.trim());
    try {
      const name = await verifyToken();
      setLogin(name);
    } catch {
      clearToken();
      setAuthError("That token didn't work. Check it has `repo` scope (or Contents: Read/write) and try again.");
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = () => {
    clearToken();
    setLogin(null);
    setTokenInput("");
  };

  if (checking) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-10">
        <p className="text-sm text-ink-2">Checking sign-in…</p>
      </div>
    );
  }

  if (!login) {
    return (
      <div className="mx-auto flex max-w-[1400px] justify-center px-6 py-32 lg:px-10">
        <div className="w-full max-w-md border border-line bg-bg-2 p-8">
          <p className="font-display text-2xl font-semibold uppercase tracking-wide text-ink-0">
            Admin Sign-In
          </p>
          <p className="mt-2 text-sm text-ink-2">
            Paste a GitHub personal access token with <span className="text-ink-1">repo</span> scope
            (or a fine-grained token with Contents: Read and write on this repo). It's saved only in
            this browser.
          </p>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="ghp_..."
            className="mt-5 w-full border border-line bg-bg-1 px-4 py-3 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
          {authError && <p className="mt-3 text-xs text-red-400">{authError}</p>}
          <button
            type="button"
            onClick={handleSignIn}
            disabled={signingIn}
            className="mt-4 w-full border border-line-strong bg-white px-4 py-3 text-xs font-semibold tracking-[0.2em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {signingIn ? "SIGNING IN…" : "SIGN IN"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-ink-2">SIGNED IN AS</p>
          <p className="font-display text-2xl font-semibold uppercase tracking-wide text-ink-0">
            {login}
          </p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="border border-line px-4 py-2 text-xs font-semibold tracking-[0.2em] text-ink-1 transition-colors hover:border-line-strong hover:text-ink-0"
        >
          SIGN OUT
        </button>
      </div>

      <Tabs options={TAB_OPTIONS} value={tab} onChange={setTab} className="mt-8 mb-8" />

      {tab === "schedule" && <AdminSchedule />}
      {tab === "skaters" && <AdminSkaterLogs />}
      {tab === "goalies" && <AdminGoalieLogs />}
      {tab === "rosters" && <AdminRosters />}
    </div>
  );
}
