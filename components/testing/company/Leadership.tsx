// PLACEHOLDER: portraits are hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Image from "next/image";
import { ASSETS } from "../cdn";

interface Leader {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

const LEADERS: Leader[] = [
  {
    name: "Alec Maguire",
    role: "President & Managing Partner",
    photo: ASSETS.portraits.alec,
    bio: "Alec has spent thirty years building aviation enterprises—from charter operations to major FBO developments. That experience informed his belief that lasting success comes through people. He prioritizes mentoring, builds teams that stand independently, and focuses on relationships that outlast transactions and endure industry cycles.",
  },
  {
    name: "Candice Bushman",
    role: "Charter Operations Manager",
    photo: ASSETS.portraits.candice,
    bio: "Candice's aviation journey began over a decade ago in Honolulu and grew in the Pacific Northwest. At Boeing Field, she found her niche in Charter Operations, advancing to enhance experiences for clients and employees.",
  },
  {
    name: "Karl Olson",
    role: "Director of Operations",
    photo: ASSETS.portraits.karl,
    bio: "Karl, a Seattle native and University of Washington graduate, learned to fly at Boeing Field. He and his wife enjoy boating in summer and skiing in winter. Passionate about corporate aviation, he's proud of Eleven Aviation's culture of exceptional service.",
  },
];

export default function Leadership() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
            Leadership
          </p>
          <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl md:text-5xl">
            The team behind every flight.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {LEADERS.map((l) => (
            <article key={l.name} className="group flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={l.photo}
                  alt={l.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center bg-black/80 p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-sm leading-relaxed text-white">{l.bio}</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-display text-2xl text-neutral-900">
                  {l.name}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">
                  {l.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
