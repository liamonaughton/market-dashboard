// PLACEHOLDER: logo is hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Link from "next/link";
import { ASSETS } from "./cdn";

const NAV_LINKS = [
  { href: "#aircraft", label: "Aircraft" },
  { href: "#management", label: "Management" },
  { href: "#company", label: "Company" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="#top" aria-label="Eleven Aviation home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.logo}
            alt="Eleven Aviation"
            className="h-8 w-auto"
            style={{ filter: "brightness(0)" }}
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.25em] text-neutral-700 transition hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="tel:12063092895"
            className="hidden text-xs uppercase tracking-[0.2em] text-neutral-700 transition hover:text-gold md:inline"
          >
            1.206.309.2895
          </a>
          <a
            href="#quote"
            className="bg-gold px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-gold"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
