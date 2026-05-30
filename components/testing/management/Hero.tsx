"use client";

// PLACEHOLDER: service hero images are hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Image from "next/image";
import { useEffect, useState } from "react";
import { ASSETS } from "../cdn";

interface Service {
  title: string;
  body: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    title: "Management",
    body: "A turnkey ownership program — flight operations, crew, scheduling, and reporting handled with the same discretion you apply to your own enterprise.",
    image: ASSETS.managementHero.management,
  },
  {
    title: "Maintenance",
    body: "An in-house, factory-trained maintenance team safeguards dispatch reliability and protects long-term residual value.",
    image: ASSETS.managementHero.maintenance,
  },
  {
    title: "Hangarage",
    body: "Secure, climate-controlled hangar space at Boeing Field — your aircraft is always sheltered, fueled, and ready to depart.",
    image: ASSETS.managementHero.hangarage,
  },
  {
    title: "Acquisition",
    body: "From pre-buy inspections to international registry transfers, we guide ownership decisions with independent, unbiased counsel.",
    image: ASSETS.managementHero.acquisition,
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function ManagementHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SERVICES.length),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(id);
  }, []);

  const go = (i: number) =>
    setIndex(((i % SERVICES.length) + SERVICES.length) % SERVICES.length);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="relative h-full w-full shrink-0 basis-full"
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
              <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">
                Our Services
              </p>
              <h1 className="font-display text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
                {s.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 border border-white/40 bg-black/30 p-3 text-white backdrop-blur transition hover:border-gold hover:text-gold sm:left-8"
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 border border-white/40 bg-black/30 p-3 text-white backdrop-blur transition hover:border-gold hover:text-gold sm:right-8"
      >
        <Chevron direction="right" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {SERVICES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to ${s.title}`}
            onClick={() => go(i)}
            className={`h-1 transition-all duration-500 ${
              i === index ? "w-10 bg-gold" : "w-5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: direction === "left" ? "rotate(180deg)" : undefined,
      }}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
