import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col items-center px-6 py-40 text-center lg:px-10">
      <p className="text-xs font-semibold tracking-[0.3em] text-ink-2">404</p>
      <h1 className="font-display mt-3 text-5xl font-bold uppercase tracking-wide text-ink-0 sm:text-6xl">
        Icing Called
      </h1>
      <p className="mt-4 max-w-md text-sm text-ink-2">
        That page isn't on the schedule. Head back to the home ice.
      </p>
      <Link
        to="/"
        className="mt-8 border border-white bg-white px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white"
      >
        BACK HOME
      </Link>
    </div>
  );
}
