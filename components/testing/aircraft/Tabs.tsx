"use client";

import Image from "next/image";
import { useState } from "react";
import { Aircraft, KV } from "./data";

const TABS = ["Overview", "Performance", "Interior", "Layout", "Amenities"] as const;
type Tab = (typeof TABS)[number];

interface TabsProps {
  aircraft: Aircraft;
}

export default function AircraftTabs({ aircraft }: TabsProps) {
  const [active, setActive] = useState<Tab>("Overview");

  return (
    <section id="details" className="bg-white">
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6">
          <nav
            role="tablist"
            aria-label="Aircraft details"
            className="-mb-px flex flex-wrap gap-x-8 overflow-x-auto"
          >
            {TABS.map((t) => {
              const isActive = t === active;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActive(t)}
                  className={`relative whitespace-nowrap px-1 py-5 text-xs uppercase tracking-[0.25em] transition-colors ${
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {t}
                  <span
                    className={`absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-gold transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {renderTab(active, aircraft)}
      </div>
    </section>
  );
}

function renderTab(tab: Tab, aircraft: Aircraft) {
  switch (tab) {
    case "Overview":
      return <Overview aircraft={aircraft} />;
    case "Performance": {
      const p = aircraft.tabs?.performance;
      return p ? (
        <Performance aircraft={aircraft} data={p} />
      ) : (
        <ComingSoon tab="Performance" />
      );
    }
    case "Interior": {
      const i = aircraft.tabs?.interior;
      return i ? <Interior data={i} /> : <ComingSoon tab="Interior" />;
    }
    case "Layout": {
      const l = aircraft.tabs?.layout;
      return l ? <Layout data={l} /> : <ComingSoon tab="Layout" />;
    }
    case "Amenities": {
      const a = aircraft.tabs?.amenities;
      return a ? <Amenities items={a} /> : <ComingSoon tab="Amenities" />;
    }
  }
}

function Overview({ aircraft }: { aircraft: Aircraft }) {
  return (
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <a
          href={aircraft.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold transition hover:text-neutral-900"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download Spec Sheet (PDF)
        </a>
        <h2 className="mt-6 font-display text-3xl text-neutral-900 sm:text-4xl">
          About the {aircraft.name}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-neutral-600">
          {aircraft.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:col-span-1">
        <Stat label="Flight Hours" value={aircraft.stats.flightHours} />
        <Stat label="Nautical Miles" value={aircraft.stats.nauticalMiles} />
        <Stat label="Passengers" value={aircraft.stats.passengers} />
        <Stat label="Luggage Items" value={aircraft.stats.luggage} />
      </div>
    </div>
  );
}

function Stat({ label, value }: KV) {
  return (
    <div className="border border-neutral-200 bg-white p-5 text-center shadow-sm">
      <p className="font-display text-2xl text-neutral-900 sm:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-gold">
        {label}
      </p>
    </div>
  );
}

function Performance({
  aircraft,
  data,
}: {
  aircraft: Aircraft;
  data: NonNullable<NonNullable<Aircraft["tabs"]>["performance"]>;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl">
          Performance
        </h2>
        {data.text ? (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600">
            {data.text}
          </p>
        ) : null}
      </div>
      {data.specs && data.specs.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.specs.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      ) : null}
      {data.images && data.images.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {data.images.map((src, i) => (
            <PhotoTile key={src} src={src} alt={`${aircraft.name} ${i + 1}`} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Interior({
  data,
}: {
  data: NonNullable<NonNullable<Aircraft["tabs"]>["interior"]>;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl">
          Inside the cabin
        </h2>
        {data.text ? (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600">
            {data.text}
          </p>
        ) : null}
      </div>
      {data.images && data.images.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {data.images.map((src, i) => (
            <PhotoTile key={src} src={src} alt={`Cabin ${i + 1}`} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Layout({
  data,
}: {
  data: NonNullable<NonNullable<Aircraft["tabs"]>["layout"]>;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl">
          Cabin layout
        </h2>
        {data.text ? (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600">
            {data.text}
          </p>
        ) : null}
      </div>
      {data.dimensions && data.dimensions.length > 0 ? (
        <div>
          <h3 className="font-display text-2xl text-neutral-900">
            Cabin Dimensions
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {data.dimensions.map((d) => (
              <Stat key={d.label} {...d} />
            ))}
          </div>
        </div>
      ) : null}
      {data.images && data.images.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {data.images.map((src, i) => (
            <PhotoTile key={src} src={src} alt={`Cabin layout ${i + 1}`} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Amenities({ items }: { items: string[] }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-neutral-900 sm:text-4xl">
        Onboard
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <li
            key={a}
            className="flex items-start gap-3 border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-gold" />
            <span className="text-sm leading-relaxed text-neutral-800">{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhotoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-md bg-neutral-100 shadow-sm transition hover:shadow-md">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
}

function ComingSoon({ tab }: { tab: string }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center border border-dashed border-neutral-300 bg-neutral-50">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          {tab}
        </p>
        <p className="mt-2 font-display text-2xl text-neutral-900">
          Coming soon
        </p>
      </div>
    </div>
  );
}
