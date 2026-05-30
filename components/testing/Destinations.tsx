// PLACEHOLDER: destination photos are hotlinked from the Eleven Aviation CDN.
// Swap to /public/testing/destinations/<slug>.jpg before shipping.
import Image from "next/image";
import { CDN } from "./cdn";

interface Destination {
  name: string;
  file: string;
}

const DESTINATIONS: Destination[] = [
  { name: "New York", file: "Rectangle 124.png" },
  { name: "Las Vegas", file: "Rectangle 125.png" },
  { name: "Aspen", file: "Rectangle 126.png" },
  { name: "Napa Valley", file: "Rectangle 127.png" },
  { name: "Oahu", file: "Rectangle 128.png" },
  { name: "Cabo San Lucas", file: "Rectangle 129.png" },
  { name: "London", file: "Rectangle 130.png" },
  { name: "Paris", file: "Rectangle 131.png" },
  { name: "Tokyo", file: "Rectangle 132.png" },
  { name: "Dubai", file: "Rectangle 133.png" },
  { name: "Sedona", file: "Rectangle 134.png" },
  { name: "Lake Tahoe", file: "Rectangle 135.png" },
  { name: "Washington DC", file: "Rectangle 136.png" },
  { name: "Nashville", file: "Rectangle 137.png" },
  { name: "Anchorage", file: "Rectangle 138.png" },
  { name: "San Diego", file: "Rectangle 139.png" },
  { name: "Whistler", file: "Rectangle 140.png" },
  { name: "Sun Valley", file: "Rectangle 36.png" },
  { name: "San Francisco", file: "Rectangle 38.png" },
  { name: "Spokane", file: "Rectangle 67.png" },
  { name: "Miami", file: "Rectangle 67 (1).png" },
];

function destinationUrl(file: string) {
  return `${CDN}/images/Destinations/${encodeURIComponent(file)}`;
}

export default function Destinations() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
            Destinations
          </p>
          <h2 className="font-display text-3xl text-white sm:text-4xl md:text-5xl">
            Anywhere worth going.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60">
            A snapshot of the cities our clients call home — and the ones they
            disappear to.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {DESTINATIONS.map((d) => (
            <div
              key={d.name}
              className="group relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/[0.02]"
            >
              <Image
                src={destinationUrl(d.file)}
                alt={d.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                <span className="font-display text-lg text-white">{d.name}</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold opacity-0 transition group-hover:opacity-100">
                  Fly →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
