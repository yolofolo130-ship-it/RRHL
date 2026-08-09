import PageHeader from "@/components/PageHeader";
import { staff, staffCategoryOrder } from "@/data/staff";

export default function Staff() {
  return (
    <>
      <PageHeader eyebrow="RRHL STAFF TEAM" title="Staff" />

      <section className="mx-auto px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-14">
          {staffCategoryOrder.map((category) => {
            const members = staff.filter((member) => member.category === category);
            if (members.length === 0) return null;
            return (
              <div key={category}>
                <p className="border-b border-line pb-4 text-xs font-semibold tracking-[0.28em] text-ink-2">
                  {category.toUpperCase()}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong"
                    >
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          loading="lazy"
                          className="h-14 w-14 shrink-0 border border-line object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-bg-3 font-display text-lg font-semibold text-ink-1">
                          {member.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                          {member.name}
                        </p>
                        <p className="truncate text-xs text-ink-2">{member.role}</p>
                        <p className="truncate text-xs text-ink-3">{member.discord}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
