import PageHeader from "@/components/PageHeader";
import { accolades } from "@/data/accolades";

export default function Accolades() {
  return (
    <>
      <PageHeader eyebrow="END OF SEASON" title="Accolades" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accolades.map((accolade) => (
            <div
              key={accolade.id}
              className="flex flex-col gap-2 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong"
            >
              <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                {accolade.name}
              </p>
              <p className="text-sm text-ink-2">{accolade.winner || "To be announced"}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
