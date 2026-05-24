import { NewsArticle, NewsBucket } from "@/lib/types";
import Card from "./Card";

interface NewsHeadlinesProps {
  news: NewsBucket | null;
}

export default function NewsHeadlines({ news }: NewsHeadlinesProps) {
  return (
    <Card title="News Headlines" subtitle="Markets, economy & policy">
      {news ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Bucket label="Past 24 Hours" articles={news.past24h} />
          <Bucket label="Past Week" articles={news.pastWeek} />
        </div>
      ) : (
        <p className="text-sm text-muted">Data unavailable</p>
      )}
    </Card>
  );
}

function Bucket({ label, articles }: { label: string; articles: NewsArticle[] }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </h3>
      {articles.length ? (
        <ul className="space-y-3">
          {articles.slice(0, 12).map((a) => (
            <li key={a.url} className="border-b border-border/60 pb-3 last:border-none">
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white hover:text-accent"
              >
                {a.title}
              </a>
              <p className="mt-1 text-xs text-muted">
                {a.source} · {formatRelative(a.publishedAt)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No headlines.</p>
      )}
    </div>
  );
}

function formatRelative(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;
  const diff = Date.now() - then;
  const minutes = Math.round(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
