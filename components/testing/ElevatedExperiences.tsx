// PLACEHOLDER: icons are hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import { ASSETS } from "./cdn";

interface Feature {
  title: string;
  body: string;
  icon: string;
}

const FEATURES: Feature[] = [
  {
    title: "Effortless Travel",
    body: "From first call to final arrival, every detail is anticipated and handled with discretion.",
    icon: ASSETS.icons.feather,
  },
  {
    title: "Pricing Transparency",
    body: "Clear, honest pricing with no hidden surcharges — the quote you see is the quote you fly.",
    icon: ASSETS.icons.eyeDollar,
  },
  {
    title: "Safety & Maintenance",
    body: "Industry-leading safety standards backed by an in-house maintenance program and ARGUS-rated operators.",
    icon: ASSETS.icons.shieldPlus,
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.icon} alt="" className="h-10 w-10" />
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
