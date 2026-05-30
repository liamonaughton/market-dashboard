// PLACEHOLDER: replace each gradient tile background with a real /public/testing/destinations/<slug>.jpg.
const DESTINATIONS = [
  "New York",
  "Las Vegas",
  "Aspen",
  "Napa Valley",
  "Oahu",
  "Cabo San Lucas",
  "London",
  "Paris",
  "Tokyo",
  "Dubai",
  "Sedona",
  "Lake Tahoe",
  "Washington DC",
  "Nashville",
  "Anchorage",
  "San Diego",
  "Whistler",
  "Sun Valley",
  "San Francisco",
  "Spokane",
  "Miami",
];

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
          {DESTINATIONS.map((city, i) => (
            <div
              key={city}
              className="group relative aspect-[4/3] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01]"
            >
              <div
                className="absolute inset-0 opacity-60 transition group-hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, hsl(${(i * 37) % 360} 30% 18%) 0%, hsl(${(i * 37 + 180) % 360} 25% 8%) 100%)`,
                }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                <span className="font-display text-lg text-white">{city}</span>
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
