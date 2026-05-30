"use client";

// PLACEHOLDER: logo is hotlinked from the Eleven Aviation CDN — see components/testing/cdn.ts.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ASSETS } from "./cdn";

const NAV_LINKS = [
  { href: "/testing", label: "Aircraft", match: (p: string) => p === "/testing" },
  {
    href: "/testing/management",
    label: "Management",
    match: (p: string) => p.startsWith("/testing/management"),
  },
  {
    href: "/testing/company",
    label: "Company",
    match: (p: string) => p.startsWith("/testing/company"),
  },
];

interface HeaderProps {
  /**
   * "default" — light CDN logo inverted to black (good on white).
   * "dark" — uses the dedicated DarkLogo.svg variant as-is.
   */
  variant?: "default" | "dark";
}

export default function Header({ variant = "default" }: HeaderProps) {
  const pathname = usePathname() ?? "/";
  const logoSrc = variant === "dark" ? ASSETS.darkLogo : ASSETS.logo;
  const logoStyle =
    variant === "dark" ? undefined : { filter: "brightness(0)" };

  return (
    <header className="group sticky top-0 z-30 border-t border-transparent bg-white/90 backdrop-blur transition-colors duration-300 hover:border-gold">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-5">
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => {
            const active = l.match(pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group/link relative text-xs uppercase tracking-[0.25em] transition-colors ${
                  active ? "text-neutral-900" : "text-neutral-700 hover:text-gold"
                }`}
              >
                <span>{l.label}</span>
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-300 ease-out ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover/link:scale-x-100"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex justify-center">
          <Link href="/testing" aria-label="Eleven Aviation home" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Eleven Aviation"
              className="h-8 w-auto"
              style={logoStyle}
            />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-5">
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
