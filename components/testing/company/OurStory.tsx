// PLACEHOLDER: editorial image is hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Image from "next/image";
import { ASSETS } from "../cdn";

export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 aspect-[4/5] w-full overflow-hidden bg-neutral-100 shadow-sm lg:order-1">
            <Image
              src={ASSETS.company.skier}
              alt="Backcountry skier"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">
              Our Story
            </p>
            <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl md:text-5xl">
              Going past the scale.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              Our name, Eleven, was inspired by an exceptional journey our
              founders experienced. When we described the significance of the
              number 11, we were told that while a scale of 1 to 10 measures
              great experiences, 11 signifies going beyond that—offering truly
              extraordinary service.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              This philosophy drives everything we do. Our mission is to exceed
              the expected, ensuring that every interaction with us is nothing
              short of exceptional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
