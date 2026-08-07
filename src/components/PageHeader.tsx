interface PageHeaderProps {
  eyebrow: string;
  title: string;
}

export default function PageHeader({ eyebrow, title }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-bg-1">
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-36 lg:px-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-ink-2">{eyebrow}</p>
        <h1 className="font-display mt-2 text-5xl font-bold uppercase tracking-wide text-ink-0 sm:text-6xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
