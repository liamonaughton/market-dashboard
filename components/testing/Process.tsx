const STEPS = [
  "Get in Touch",
  "Review Options",
  "Confirm Booking",
  "Arrive 15 Min Early",
  "Relax and Take Off",
];

export default function Process() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
          The Process
        </p>
        <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl md:text-5xl">
          Delivering seamless, white-glove service
          <br className="hidden sm:block" />
          at every touchpoint.
        </h2>
      </div>

      <ol className="mx-auto mt-16 flex max-w-6xl flex-wrap items-start justify-center gap-x-6 gap-y-10 px-6">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className="flex flex-1 basis-[180px] flex-col items-center text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold font-display text-lg text-gold">
              {String(i + 1).padStart(2, "0")}
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-neutral-900">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
