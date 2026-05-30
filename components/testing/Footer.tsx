// PLACEHOLDER: logo is hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import { ASSETS } from "./cdn";

const NAV_LINKS = [
  { href: "#aircraft", label: "Aircraft" },
  { href: "#management", label: "Management" },
  { href: "#company", label: "Company" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="Eleven Aviation" className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Private charter, aircraft management, and acquisitions — delivered
            with the discretion the journey deserves.
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href="tel:12063092895" className="transition hover:text-white">
                1.206.309.2895
              </a>
            </li>
            <li>
              <a
                href="mailto:charter@elevenaviation.com"
                className="transition hover:text-white"
              >
                charter@elevenaviation.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6">
        <p className="text-xs leading-relaxed text-white/40">
          We operate under Certificate ISPA254T Springfield Aircraft Charter
          and Sales d.b.a as Eleven Aviation.
        </p>
        <p className="mt-3 text-xs text-white/30">
          © {new Date().getFullYear()} Eleven Aviation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
