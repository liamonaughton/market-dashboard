// PLACEHOLDER: form is non-functional — wire up to a real submit handler / form service before launch.
const INTEREST_OPTIONS = [
  "Aircraft Management",
  "Charter",
  "Maintenance",
  "Hangarage",
  "Acquisition",
  "Other",
];

const REFERRAL_OPTIONS = [
  "Referral from a current owner",
  "Pilot or flight crew",
  "Online search",
  "Industry event",
  "Other",
];

export default function ContactForm() {
  return (
    <section id="quote" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
            Request a Quote
          </p>
          <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl md:text-5xl">
            Let's plan your next flight.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Share a few details and a member of our team will follow up within
            the hour.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <form
            className="space-y-6 lg:col-span-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name">
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 outline-none transition focus:border-gold"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 outline-none transition focus:border-gold"
                />
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="I'm interested in">
                <select
                  name="interest"
                  defaultValue=""
                  className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 outline-none transition focus:border-gold"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {INTEREST_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="How did you hear about us?">
                <select
                  name="referral"
                  defaultValue=""
                  className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 outline-none transition focus:border-gold"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {REFERRAL_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Trip details">
              <textarea
                name="details"
                rows={5}
                placeholder="Routing, dates, passengers, special requests…"
                className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-gold"
              />
            </Field>

            <button
              type="submit"
              className="bg-gold px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-gold"
            >
              Submit Inquiry
            </button>
          </form>

          <aside className="space-y-8 border-l border-neutral-200 pl-8 lg:pl-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Call
              </p>
              <a
                href="tel:12063092895"
                className="mt-2 block font-display text-2xl text-neutral-900 transition hover:text-gold"
              >
                1.206.309.2895
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Email
              </p>
              <a
                href="mailto:charter@elevenaviation.com"
                className="mt-2 block text-sm text-neutral-700 transition hover:text-gold"
              >
                charter@elevenaviation.com
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Visit
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                223 10th St S
                <br />
                Kirkland, WA 98033
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
