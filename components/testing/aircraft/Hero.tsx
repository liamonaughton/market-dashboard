// PLACEHOLDER: hero image is hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Image from "next/image";
import { Aircraft } from "./data";

interface AircraftHeroProps {
  aircraft: Aircraft;
}

export default function AircraftHero({ aircraft }: AircraftHeroProps) {
  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-black">
      <Image
        src={aircraft.hero}
        alt={`${aircraft.name} (${aircraft.tail})`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-gold">
          {aircraft.tail}
        </p>
        <h1 className="font-display text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {aircraft.name}
        </h1>
      </div>

      <a
        href="#details"
        aria-label="Scroll to details"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/70 transition hover:text-white"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="animate-bounce"
        >
          <path
            d="M12 4v16M5 13l7 7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
