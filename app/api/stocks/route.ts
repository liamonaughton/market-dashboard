import { NextRequest, NextResponse } from "next/server";
import { CandlePoint, StockData, Timeframe } from "@/lib/types";

const FINNHUB_KEY = process.env.FINNHUB_KEY ?? "";
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY ?? "";

interface AVConfig {
  function: string;
  seriesKey: string;
  intraday: boolean;
  extra: Record<string, string>;
}

const AV_CONFIG: Record<Timeframe, AVConfig> = {
  "24h": {
    function: "TIME_SERIES_INTRADAY",
    seriesKey: "Time Series (60min)",
    intraday: true,
    extra: { interval: "60min" },
  },
  "1w": {
    function: "TIME_SERIES_INTRADAY",
    seriesKey: "Time Series (60min)",
    intraday: true,
    extra: { interval: "60min" },
  },
  "1m": {
    function: "TIME_SERIES_DAILY",
    seriesKey: "Time Series (Daily)",
    intraday: false,
    extra: { outputsize: "compact" },
  },
  "6m": {
    function: "TIME_SERIES_DAILY",
    seriesKey: "Time Series (Daily)",
    intraday: false,
    extra: { outputsize: "compact" },
  },
  "1y": {
    function: "TIME_SERIES_DAILY",
    seriesKey: "Time Series (Daily)",
    intraday: false,
    extra: { outputsize: "full" },
  },
  "5y": {
    function: "TIME_SERIES_WEEKLY",
    seriesKey: "Weekly Time Series",
    intraday: false,
    extra: {},
  },
};

const TF_WINDOW_MS: Record<Timeframe, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
  "1m": 31 * 24 * 60 * 60 * 1000,
  "6m": 183 * 24 * 60 * 60 * 1000,
  "1y": 366 * 24 * 60 * 60 * 1000,
  "5y": 5 * 366 * 24 * 60 * 60 * 1000,
};

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
  [key: string]: unknown;
}

function parseTimestamp(key: string, intraday: boolean): number {
  // Intraday keys arrive as "YYYY-MM-DD HH:MM:SS" in US/Eastern. We approximate
  // them by reading the wall clock as UTC; absolute timestamps shift by the ET
  // offset but the chart's relative ordering and spacing is preserved.
  if (intraday) {
    return new Date(key.replace(" ", "T") + "Z").getTime();
  }
  return new Date(key).getTime();
}

async function fetchAlphaVantageSeries(
  symbol: string,
  timeframe: Timeframe
): Promise<CandlePoint[]> {
  if (!ALPHA_VANTAGE_KEY) {
    console.warn("[stocks] Missing ALPHA_VANTAGE_KEY; skipping series");
    return [];
  }
  const cfg = AV_CONFIG[timeframe];
  const params = new URLSearchParams({
    function: cfg.function,
    symbol,
    apikey: ALPHA_VANTAGE_KEY,
    ...cfg.extra,
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
    const seriesObj = data[cfg.seriesKey] as Record<string, AVBar> | undefined;
    if (!seriesObj) {
      console.warn(
        "[stocks] alpha vantage missing series key",
        symbol,
        cfg.seriesKey,
        Object.keys(data)
      );
      return [];
    }
    const cutoff = Date.now() - TF_WINDOW_MS[timeframe];
    const points: CandlePoint[] = [];
    for (const [key, bar] of Object.entries(seriesObj)) {
      const t = parseTimestamp(key, cfg.intraday);
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
  const tfParam = (req.nextUrl.searchParams.get("timeframe") ?? "1m") as Timeframe;
  const timeframe: Timeframe = tfParam in AV_CONFIG ? tfParam : "1m";

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
  }

  try {
    const [series, quoteRes] = await Promise.all([
      fetchAlphaVantageSeries(symbol, timeframe),
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
