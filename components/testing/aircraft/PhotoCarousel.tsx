"use client";

import Image from "next/image";
import { useState } from "react";

interface PhotoCarouselProps {
  images: string[];
  altPrefix?: string;
}

export default function PhotoCarousel({
  images,
  altPrefix = "Aircraft photo",
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const go = (i: number) =>
    setIndex(((i % images.length) + images.length) % images.length);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className={`object-cover transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(index - 1)}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border border-white/60 bg-black/30 p-3 text-white backdrop-blur transition hover:border-gold hover:text-gold sm:left-6"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(index + 1)}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border border-white/60 bg-black/30 p-3 text-white backdrop-blur transition hover:border-gold hover:text-gold sm:right-6"
          >
            <Chevron direction="right" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1 transition-all duration-500 ${
                i === index ? "w-10 bg-gold" : "w-5 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
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
