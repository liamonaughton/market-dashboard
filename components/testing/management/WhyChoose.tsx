// PLACEHOLDER: icons are hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import { ASSETS } from "../cdn";

interface Reason {
  title: string;
  body: string;
  icon: string;
}

const REASONS: Reason[] = [
  {
    title: "Cost Efficiency",
    body: "Smart scheduling, charter offset programs, and disciplined vendor management keep operating costs as predictable as your itinerary.",
    icon: ASSETS.managementIcons.dollar,
  },
  {
    title: "Transparent Pricing",
    body: "Itemized monthly statements and audit-ready records — you always know what you're paying for, and why.",
    icon: ASSETS.managementIcons.eye,
  },
  {
    title: "Tailored Solutions",
    body: "No two ownership profiles are alike. We build a management program around the way you actually fly, not a template.",
    icon: ASSETS.managementIcons.gear,
  },
  {
    title: "Best Practices",
    body: "ARGUS-rated procedures, IS-BAO alignment, and a safety culture that compounds with every flight.",
    icon: ASSETS.managementIcons.thumbsUp,
  },
  {
    title: "Owner Education & Support",
    body: "Quarterly reviews, regulatory briefings, and a dedicated owner liaison who answers the phone — every time.",
    icon: ASSETS.managementIcons.peopleTime,
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
            Why Choose Eleven?
          </p>
          <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl md:text-5xl">
            A management partner — not a vendor.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="border border-neutral-200 bg-white p-8 shadow-sm transition hover:border-gold/60 hover:shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.icon}
                alt=""
                className="h-10 w-10"
                style={{
                  filter:
                    "invert(72%) sepia(33%) saturate(437%) hue-rotate(2deg) brightness(91%) contrast(86%)",
                }}
              />
              <h3 className="mt-6 font-display text-2xl text-neutral-900">
                {r.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
