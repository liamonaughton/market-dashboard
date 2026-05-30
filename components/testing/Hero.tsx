// PLACEHOLDER: video + arrow are hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import { ASSETS } from "./cdn";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-black"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster=""
      >
        <source src={ASSETS.heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-gold">
          Eleven Aviation
        </p>
        <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Introducing the next chapter
          <br />
          of luxury travel.
        </h1>
      </div>

      <a
        href="#elevated"
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 transition hover:text-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.downArrow}
          alt=""
          className="h-8 w-8 animate-bounce"
        />
      </a>
    </section>
  );
}
