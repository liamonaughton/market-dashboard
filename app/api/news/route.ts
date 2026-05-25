import { NextResponse } from "next/server";
import { NewsArticle, NewsBucket } from "@/lib/types";

const NEWSAPI_KEY = process.env.NEWSAPI_KEY ?? "";

interface NewsApiArticle {
  title: string;
  source: { name: string };
  publishedAt: string;
  url: string;
}

interface NewsApiResponse {
  status: string;
  articles?: NewsApiArticle[];
}

async function fetchHeadlines(fromIso: string): Promise<NewsArticle[]> {
  const url =
    "https://newsapi.org/v2/everything?" +
    new URLSearchParams({
      q: "markets OR economy OR stocks OR fed",
      language: "en",
      sortBy: "publishedAt",
      pageSize: "20",
      from: fromIso,
      apiKey: NEWSAPI_KEY,
    }).toString();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`NewsAPI ${res.status}`);
  const data = (await res.json()) as NewsApiResponse;
  return (data.articles ?? []).map((a) => ({
    title: a.title,
    source: a.source?.name ?? "Unknown",
    publishedAt: a.publishedAt,
    url: a.url,
  }));
}

export const dynamic = "force-dynamic";

export async function GET() {
  if (!NEWSAPI_KEY) {
    return NextResponse.json({ error: "Missing NEWSAPI_KEY" }, { status: 500 });
  }
  const now = Date.now();
  const day = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const week = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
  try {
    const [past24h, pastWeek] = await Promise.all([
      fetchHeadlines(day),
      fetchHeadlines(week),
    ]);
    const bucket: NewsBucket = { past24h, pastWeek };
    return NextResponse.json(bucket);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 502 }
    );
  }
}
