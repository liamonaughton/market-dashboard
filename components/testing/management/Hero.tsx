// PLACEHOLDER: service hero images are hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Image from "next/image";
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

export default function ManagementHero() {
  return (
    <section className="bg-white pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
            Management
          </p>
          <h1 className="font-display text-4xl text-neutral-900 sm:text-5xl md:text-6xl">
            Ownership, made effortless.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Four disciplines, one team. Eleven Aviation oversees every facet of
            aircraft ownership so the only decision you make is where to fly
            next.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group overflow-hidden border border-neutral-200 bg-white shadow-sm transition hover:border-gold/50 hover:shadow-md"
            >
              <div className="relative h-56 w-full bg-neutral-100">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl text-neutral-900">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
