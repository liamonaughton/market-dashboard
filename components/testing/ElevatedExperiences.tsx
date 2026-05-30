// PLACEHOLDER: replace each SVG block with finalized brand iconography when ready.
interface Feature {
  title: string;
  body: string;
  icon: JSX.Element;
}

const FEATURES: Feature[] = [
  {
    title: "Effortless Travel",
    body: "From first call to final arrival, every detail is anticipated and handled with discretion.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 12l20-8-5 20-4-9-11-3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Pricing Transparency",
    body: "Clear, honest pricing with no hidden surcharges — the quote you see is the quote you fly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 10h6M9 14h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Safety & Maintenance",
    body: "Industry-leading safety standards backed by an in-house maintenance program and ARGUS-rated operators.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ElevatedExperiences() {
  return (
    <section id="elevated" className="bg-[#0a0e1a] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
            The Eleven Difference
          </p>
          <h2 className="font-display text-3xl text-white sm:text-4xl md:text-5xl">
            Elevated experiences, end to end.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60">
            Eleven Aviation pairs a meticulously maintained fleet with a team
            that treats every journey as the headline event of your day.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group border border-white/10 bg-white/[0.02] p-8 transition hover:border-gold/60"
            >
              <div className="h-10 w-10 text-gold">{f.icon}</div>
              <h3 className="mt-6 font-display text-2xl text-white">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
