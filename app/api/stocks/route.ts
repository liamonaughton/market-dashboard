import { NextRequest, NextResponse } from "next/server";
import { CandlePoint, StockData, Timeframe } from "@/lib/types";

const FINNHUB_KEY = process.env.FINNHUB_KEY ?? "";

const YAHOO_PARAMS: Record<Timeframe, { range: string; interval: string }> = {
  "24h": { range: "1d", interval: "5m" },
  "1w": { range: "5d", interval: "15m" },
  "1m": { range: "1mo", interval: "1d" },
  "6m": { range: "6mo", interval: "1d" },
  "1y": { range: "1y", interval: "1d" },
  "5y": { range: "5y", interval: "1wk" },
};

interface FinnhubQuote {
  c: number;
  dp: number;
  h: number;
  l: number;
}

interface YahooChartResponse {
  chart?: {
    result?: Array<{
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>;
        }>;
      };
    }>;
    error?: unknown;
  };
}

async function fetchYahooSeries(
  symbol: string,
  timeframe: Timeframe
): Promise<CandlePoint[]> {
  const { range, interval } = YAHOO_PARAMS[timeframe];
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}`;
  try {
    const res = await fetch(url, {
      headers: {
        // Yahoo serves an unauthenticated error to default Node user-agents.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "application/json,text/plain,*/*",
      },
    });
    if (!res.ok) {
      console.error("[stocks] yahoo non-2xx", symbol, res.status);
      return [];
    }
    const data = (await res.json()) as YahooChartResponse;
    const result = data.chart?.result?.[0];
    const ts = result?.timestamp ?? [];
    const closes = result?.indicators?.quote?.[0]?.close ?? [];
    const points: CandlePoint[] = [];
    for (let i = 0; i < ts.length; i++) {
      const c = closes[i];
      if (typeof c === "number" && !Number.isNaN(c)) {
        points.push({ t: ts[i] * 1000, c });
      }
    }
    return points;
  } catch (e) {
    console.error("[stocks] yahoo fetch failed", symbol, e);
    return [];
  }
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!FINNHUB_KEY) {
    return NextResponse.json({ error: "Missing FINNHUB_KEY" }, { status: 500 });
  }
  const symbol = req.nextUrl.searchParams.get("symbol");
  const label = req.nextUrl.searchParams.get("label") ?? symbol ?? "";
  const tfParam = (req.nextUrl.searchParams.get("timeframe") ?? "1m") as Timeframe;
  const timeframe: Timeframe = tfParam in YAHOO_PARAMS ? tfParam : "1m";

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
  }

  try {
    const [series, quoteRes] = await Promise.all([
      fetchYahooSeries(symbol, timeframe),
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`
      ),
    ]);

    if (!quoteRes.ok) {
      return NextResponse.json(
        { error: `Finnhub quote ${quoteRes.status}` },
        { status: 502 }
      );
    }
    const quoteRaw = (await quoteRes.json()) as FinnhubQuote;

    const closes = series.map((p) => p.c);
    const high = closes.length ? Math.max(...closes) : quoteRaw.h;
    const low = closes.length ? Math.min(...closes) : quoteRaw.l;

    const data: StockData = {
      symbol,
      label,
      current: quoteRaw.c,
      changePct24h: quoteRaw.dp,
      high,
      low,
      series,
    };
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 500 }
    );
  }
}
