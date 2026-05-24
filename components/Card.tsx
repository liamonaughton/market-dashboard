import { ReactNode } from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({
  title,
  subtitle,
  right,
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`rounded-xl border border-border bg-surface p-5 shadow-sm ${className}`}
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-muted/70">{subtitle}</p>
          ) : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </header>
      {children}
    </section>
  );
}
