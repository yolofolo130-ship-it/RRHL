import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { accolades } from "@/data/accolades";
import { useAuth } from "@/hooks/useAuth";
import { useAccoladeWinners } from "@/hooks/useAccoladeWinners";

function AccoladeCard({
  name,
  winner,
  isEditor,
  onSave,
}: {
  name: string;
  winner: string;
  isEditor: boolean;
  onSave: (value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(winner);

  const save = () => {
    onSave(draft.trim());
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-2 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong">
      <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
        {name}
      </p>

      {editing ? (
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") setEditing(false);
            }}
            placeholder="Winner name"
            className="min-w-0 flex-1 border border-line-strong bg-bg-3 px-2 py-1 text-sm text-ink-0 outline-none"
          />
          <button
            type="button"
            onClick={save}
            className="shrink-0 border border-line-strong px-2 py-1 text-xs font-semibold text-ink-0 hover:text-white"
          >
            SAVE
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={!isEditor}
          onClick={() => {
            setDraft(winner);
            setEditing(true);
          }}
          className={`text-left text-sm ${
            isEditor ? "text-ink-1 hover:text-white" : "text-ink-2"
          }`}
        >
          {winner || "To be announced"}
          {isEditor && <span className="ml-2 text-xs text-ink-3">(click to edit)</span>}
        </button>
      )}
    </div>
  );
}

export default function Accolades() {
  const { user, isEditor, signIn, logOut, firebaseEnabled } = useAuth();
  const { winners, setWinner } = useAccoladeWinners();

  return (
    <>
      <PageHeader eyebrow="END OF SEASON" title="Accolades" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        {firebaseEnabled && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-line bg-bg-1 px-5 py-4">
            {user ? (
              <>
                <p className="text-xs text-ink-2">
                  Signed in as <span className="text-ink-0">{user.displayName ?? user.uid}</span>
                  {isEditor ? (
                    <span className="ml-2 text-ink-0">— you can edit winners</span>
                  ) : (
                    <span className="ml-2">
                      — not an authorized editor (UID: <span className="text-ink-1">{user.uid}</span>)
                    </span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={logOut}
                  className="border border-line px-4 py-2 text-xs font-semibold tracking-[0.14em] text-ink-2 hover:text-ink-0"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <>
                <p className="text-xs text-ink-2">Sign in to assign accolade winners.</p>
                <button
                  type="button"
                  onClick={signIn}
                  className="border border-line px-4 py-2 text-xs font-semibold tracking-[0.14em] text-ink-0 hover:border-line-strong"
                >
                  SIGN IN WITH GITHUB
                </button>
              </>
            )}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accolades.map((accolade) => (
            <AccoladeCard
              key={accolade.id}
              name={accolade.name}
              winner={winners[accolade.id] ?? ""}
              isEditor={isEditor}
              onSave={(value) => setWinner(accolade.id, value)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
