// PLACEHOLDER: editorial image is hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Image from "next/image";
import { ASSETS } from "../cdn";

export default function WeAreEleven() {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
              We Are Eleven Aviation
            </p>
            <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl md:text-5xl">
              We are redefining the meaning of travel.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              For a seamless and sophisticated private jet charter experience,
              our approach to aviation embodies elevated standards of service
              and refinement.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 shadow-sm">
            <Image
              src={ASSETS.company.weAre}
              alt="Eleven Aviation aircraft"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
