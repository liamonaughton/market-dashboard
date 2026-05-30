// PLACEHOLDER: swap each aircraft image div for a real photo at /public/testing/fleet/<tail>.jpg.
interface Aircraft {
  tail: string;
  type: string;
  description: string;
  range: string;
  endurance: string;
  pax: string;
  luggage: string;
}

const FLEET: Aircraft[] = [
  {
    tail: "N11CP",
    type: "Citation XL",
    description:
      "A mid-size workhorse offering coast-to-coast capability with the agility of a light jet.",
    endurance: "4.3 hr",
    range: "1,843 nm",
    pax: "8 pax",
    luggage: "12 bags",
  },
  {
    tail: "N224MZ",
    type: "Gulfstream G200",
    description:
      "Super-midsize cabin, stand-up comfort, and the legs for non-stop transcontinental missions.",
    endurance: "5.75 hr",
    range: "2,700 nm",
    pax: "9 pax",
    luggage: "20 bags",
  },
  {
    tail: "N11HM",
    type: "Gulfstream G200",
    description:
      "Configured for larger groups without compromising the long-range performance you expect.",
    endurance: "5.75 hr",
    range: "2,700 nm",
    pax: "10 pax",
    luggage: "20 bags",
  },
  {
    tail: "N523JG",
    type: "Challenger 604",
    description:
      "Heavy-iron range and a full-size galley make the 604 ideal for international travel.",
    endurance: "7 hr",
    range: "4,000 nm",
    pax: "12 pax",
    luggage: "20 bags",
  },
];

export default function Fleet() {
  return (
    <section id="aircraft" className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold">
              The Fleet
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl md:text-5xl">
              Aircraft, curated for the mission.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Each tail in our fleet is selected, maintained, and operated to a
            single standard: yours.
          </p>
        </div>

        <div className="mt-12 -mx-6 overflow-x-auto px-6 pb-4">
          <div className="flex gap-6">
            {FLEET.map((a) => (
              <article
                key={a.tail}
                className="w-[320px] shrink-0 border border-white/10 bg-white/[0.02] transition hover:border-gold/50 sm:w-[360px]"
              >
                <div
                  className="flex h-48 items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02] text-xs uppercase tracking-[0.3em] text-white/30"
                  aria-hidden
                >
                  Aircraft Image
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                    {a.tail}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-white">
                    {a.type}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {a.description}
                  </p>
                  <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-xs">
                    <Spec label="Endurance" value={a.endurance} />
                    <Spec label="Range" value={a.range} />
                    <Spec label="Passengers" value={a.pax} />
                    <Spec label="Luggage" value={a.luggage} />
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.25em] text-white/40">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm text-white">{value}</dd>
    </div>
  );
}
