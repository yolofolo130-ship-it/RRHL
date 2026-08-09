import rrhlLogo from "@/assets/logos/rrhl-logo.png";

// A faint RRHL crest that slowly drifts around the viewport, fixed in
// place so it stays put while the page scrolls — a subtle ambient
// watermark, present on every page. Low opacity + pointer-events-none so
// it never competes with or blocks real content.
export default function FloatingLogo() {
  return (
    <img
      src={rrhlLogo}
      alt=""
      aria-hidden
      className="animate-logo-float pointer-events-none fixed left-[6vw] top-[22vh] z-0 h-16 w-16 object-contain opacity-[0.06] sm:h-24 sm:w-24"
    />
  );
}
