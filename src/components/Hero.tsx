import { Link } from "react-router-dom";

// No arena photo was supplied in the asset pack, so the backdrop is built
// entirely from CSS/SVG: rink lines + stadium light glows + a vignette.
// Drop a real photo at src/assets/backgrounds/hero.jpg and swap the <div>
// below for an <img>/background-image to replace it later.
export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-bg-0">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[-10%] h-[70%] w-[140%] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[10%] h-[50%] w-[50%] rounded-full bg-white/[0.03] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[10%] h-[50%] w-[50%] rounded-full bg-white/[0.03] blur-[140px]" />

        <svg
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="4" fill="white" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-bg-0" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_220px_120px_rgba(0,0,0,0.85)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 text-center">
        <p className="animate-fade-up text-xs font-semibold tracking-[0.35em] text-ink-2">
          S23 &bull; REGULAR SEASON
        </p>
        <h1 className="font-display mt-5 text-balance text-[15vw] font-bold uppercase leading-[0.92] tracking-tight text-ink-0 sm:text-7xl lg:text-8xl">
          Rec Room Hockey League
        </h1>
        <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-ink-2 sm:text-base">
          Ten clubs. One cup. Follow every faceoff, track the standings, and
          watch your squad chase the Frozen Crown.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/schedule"
            className="border border-white bg-white px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            VIEW SCHEDULE
          </Link>
          <Link
            to="/standings"
            className="border border-line bg-black/30 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-white transition-all duration-300 hover:border-line-strong hover:bg-white/10"
          >
            STANDINGS
          </Link>
        </div>
      </div>
    </section>
  );
}
