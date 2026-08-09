import PageHeader from "@/components/PageHeader";
import TrophyCard from "@/components/TrophyCard";
import { accolades } from "@/data/accolades";

export default function Accolades() {
  return (
    <>
      <PageHeader eyebrow="END OF SEASON" title="Accolades" />

      <section className="mx-auto px-6 py-14 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accolades.map((accolade) => (
            <TrophyCard
              key={accolade.id}
              name={accolade.name}
              subtitle={accolade.winner || "To be announced"}
              muted={!accolade.winner}
            />
          ))}
        </div>
      </section>
    </>
  );
}
