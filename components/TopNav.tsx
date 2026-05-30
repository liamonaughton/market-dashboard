"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/testing", label: "Testing" },
];

export default function TopNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Market
        </span>
        <ul className="flex items-center gap-6">
          {ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm transition ${
                    active
                      ? "text-white"
                      : "text-muted hover:text-white"
                  }`}
                >
                  <span
                    className={
                      active
                        ? "border-b border-white pb-1"
                        : "border-b border-transparent pb-1"
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
