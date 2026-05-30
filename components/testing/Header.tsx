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
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="#top" aria-label="Eleven Aviation home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="Eleven Aviation" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.25em] text-white/70 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="tel:12063092895"
            className="hidden text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-white md:inline"
          >
            1.206.309.2895
          </a>
          <a
            href="#quote"
            className="border border-gold px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-black"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
