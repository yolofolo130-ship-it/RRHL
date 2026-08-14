import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rrhlLogo from "@/assets/logos/rrhl-logo.png";
import { clearToken, getToken, setToken, verifyToken } from "@/admin/github";
import AdminSchedule from "@/admin/AdminSchedule";
import AdminSkaterLogs from "@/admin/AdminSkaterLogs";
import AdminGoalieLogs from "@/admin/AdminGoalieLogs";
import AdminInNet from "@/admin/AdminInNet";
import AdminRosters from "@/admin/AdminRosters";
import AdminAccolades from "@/admin/AdminAccolades";
import AdminHistory from "@/admin/AdminHistory";

interface TabDef {
  value: string;
  label: string;
  description: string;
  Component: () => React.JSX.Element;
}

interface NavGroup {
  label: string;
  tabs: TabDef[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "GAME DATA",
    tabs: [
      {
        value: "schedule",
        label: "Schedule",
        description: "Dates, times, matchups, and scores for every game.",
        Component: AdminSchedule,
      },
      {
        value: "skaters",
        label: "Skater Logs",
        description: "Per-game stat lines for every skater.",
        Component: AdminSkaterLogs,
      },
      {
        value: "goalies",
        label: "Goalie Logs",
        description: "Per-game stat lines for every goalie.",
        Component: AdminGoalieLogs,
      },
      {
        value: "innet",
        label: "In Net",
        description: "Skaters who filled in as emergency goalie.",
        Component: AdminInNet,
      },
    ],
  },
  {
    label: "ROSTERS",
    tabs: [
      {
        value: "rosters",
        label: "Rosters",
        description: "Players, jersey numbers, ratings, and trades.",
        Component: AdminRosters,
      },
    ],
  },
  {
    label: "AWARDS & HISTORY",
    tabs: [
      {
        value: "accolades",
        label: "Accolades",
        description: "Season 23 award winners and past-season awards.",
        Component: AdminAccolades,
      },
      {
        value: "history",
        label: "History",
        description: "Championship rosters, Stanley Cup champions, Hall of Fame, and records.",
        Component: AdminHistory,
      },
    ],
  },
];

const ALL_TABS = NAV_GROUPS.flatMap((g) => g.tabs);

export default function Admin() {
  const [login, setLogin] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [tokenInput, setTokenInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [tab, setTab] = useState(ALL_TABS[0].value);

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
      <div className="flex min-h-screen items-center justify-center bg-bg-0 font-admin-sans">
        <p className="text-sm text-ink-2">Checking sign-in…</p>
      </div>
    );
  }

  if (!login) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-0 px-6 font-admin-sans">
        <div className="w-full max-w-md border border-line bg-bg-2 p-8">
          <img src={rrhlLogo} alt="" className="mb-6 h-12 w-12 object-contain opacity-90" aria-hidden />
          <p className="text-xl font-semibold text-ink-0">Admin Sign-In</p>
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
          <Link
            to="/"
            className="mt-5 block text-center text-xs font-semibold tracking-[0.15em] text-ink-3 transition-colors hover:text-ink-1"
          >
            ← BACK TO SITE
          </Link>
        </div>
      </div>
    );
  }

  const active = ALL_TABS.find((t) => t.value === tab) ?? ALL_TABS[0];
  const ActiveComponent = active.Component;

  const navButtonClass = (value: string, base: string) =>
    `${base} text-left text-xs font-semibold tracking-[0.12em] transition-colors duration-200 ${
      value === tab
        ? "bg-white text-black"
        : "text-ink-2 hover:bg-bg-2 hover:text-ink-0"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-bg-0 font-admin-sans lg:flex-row">
      {/* Sidebar — desktop only */}
      <aside className="hidden shrink-0 border-r border-line bg-bg-1/40 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-col">
        <div className="flex items-center gap-3 border-b border-line px-6 py-6">
          <img src={rrhlLogo} alt="" className="h-8 w-8 object-contain" aria-hidden />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-0">RRHL Admin</p>
            <p className="truncate text-[11px] text-ink-3">{login}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.2em] text-ink-3">
                  {group.label}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.tabs.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTab(t.value)}
                      className={navButtonClass(t.value, "px-3 py-2.5")}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-2 border-t border-line px-4 py-4">
          <Link
            to="/"
            className="px-3 py-2 text-xs font-semibold tracking-[0.12em] text-ink-3 transition-colors hover:text-ink-1"
          >
            ← BACK TO SITE
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="border border-line px-3 py-2.5 text-xs font-semibold tracking-[0.12em] text-ink-1 transition-colors hover:border-line-strong hover:text-ink-0"
          >
            SIGN OUT
          </button>
        </div>
      </aside>

      {/* Top bar + nav — mobile/tablet only */}
      <div className="border-b border-line bg-bg-1/40 lg:hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={rrhlLogo} alt="" className="h-7 w-7 object-contain" aria-hidden />
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-ink-0">
              RRHL Admin
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="border border-line px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-ink-1 transition-colors hover:border-line-strong hover:text-ink-0"
          >
            SIGN OUT
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto px-4 pb-4">
          {ALL_TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={navButtonClass(t.value, "shrink-0 whitespace-nowrap px-3 py-2")}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="min-w-0 flex-1 px-6 py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="border-b border-line pb-6">
            <p className="text-2xl font-semibold text-ink-0">{active.label}</p>
            <p className="mt-1 text-sm text-ink-2">{active.description}</p>
          </div>
          <div className="mt-8">
            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
