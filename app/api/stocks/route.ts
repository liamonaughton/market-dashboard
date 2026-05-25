import { NextRequest, NextResponse } from "next/server";
import { CandlePoint, StockData } from "@/lib/types";

const FINNHUB_KEY = process.env.FINNHUB_KEY ?? "";
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY ?? "";

const WINDOW_MS = 31 * 24 * 60 * 60 * 1000;

interface FinnhubQuote {
  c: number;
  dp: number;
  h: number;
  l: number;
}

type AVBar = Record<string, string>;

interface AVResponse {
  Information?: string;
  Note?: string;
  "Error Message"?: string;
  "Time Series (Daily)"?: Record<string, AVBar>;
}

async function fetchAlphaVantageSeries(symbol: string): Promise<CandlePoint[]> {
  if (!ALPHA_VANTAGE_KEY) {
    console.warn("[stocks] Missing ALPHA_VANTAGE_KEY; skipping series");
    return [];
  }
  const params = new URLSearchParams({
    function: "TIME_SERIES_DAILY",
    symbol,
    outputsize: "compact",
    apikey: ALPHA_VANTAGE_KEY,
  });
  const url = `https://www.alphavantage.co/query?${params.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[stocks] alpha vantage non-2xx", symbol, res.status);
      return [];
    }
    const data = (await res.json()) as AVResponse;
    if (data.Information) {
      console.warn("[stocks] alpha vantage limit", symbol, data.Information);
      return [];
    }
    if (data.Note) {
      console.warn("[stocks] alpha vantage throttled", symbol, data.Note);
      return [];
    }
    if (data["Error Message"]) {
      console.error("[stocks] alpha vantage error", symbol, data["Error Message"]);
      return [];
    }
    const seriesObj = data["Time Series (Daily)"];
    if (!seriesObj) {
      console.warn("[stocks] alpha vantage missing daily series", symbol);
      return [];
    }
    const cutoff = Date.now() - WINDOW_MS;
    const points: CandlePoint[] = [];
    for (const [key, bar] of Object.entries(seriesObj)) {
      const t = new Date(key).getTime();
      if (Number.isNaN(t) || t < cutoff) continue;
      const closeStr = bar["4. close"];
      const c = closeStr != null ? Number(closeStr) : NaN;
      if (!Number.isFinite(c)) continue;
      points.push({ t, c });
    }
    points.sort((a, b) => a.t - b.t);
    return points;
  } catch (e) {
    console.error("[stocks] alpha vantage fetch failed", symbol, e);
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

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
  }

  try {
    const [series, quoteRes] = await Promise.all([
      fetchAlphaVantageSeries(symbol),
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
