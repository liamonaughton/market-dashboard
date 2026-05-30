// PLACEHOLDER: drop a real hero photo/video at /public/testing/hero.jpg and reference it via the background-image style below.
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(40,52,80,0.7) 0%, rgba(0,0,0,0.95) 65%, #000 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 transition hover:text-white"
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
          <path d="M12 4v16M5 13l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
