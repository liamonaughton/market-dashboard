import { NextRequest, NextResponse } from "next/server";
import { CandlePoint, StockData, Timeframe } from "@/lib/types";

const FINNHUB_KEY = process.env.FINNHUB_KEY ?? "";

const TF_SECONDS: Record<Timeframe, number> = {
  "24h": 24 * 60 * 60,
  "1w": 7 * 24 * 60 * 60,
  "1m": 30 * 24 * 60 * 60,
  "6m": 182 * 24 * 60 * 60,
  "1y": 365 * 24 * 60 * 60,
  "5y": 5 * 365 * 24 * 60 * 60,
};

const TF_RESOLUTION: Record<Timeframe, string> = {
  "24h": "15",
  "1w": "60",
  "1m": "D",
  "6m": "D",
  "1y": "D",
  "5y": "W",
};

interface FinnhubCandle {
  s: string;
  t?: number[];
  c?: number[];
  h?: number[];
  l?: number[];
}

interface FinnhubQuote {
  c: number;
  dp: number;
  h: number;
  l: number;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!FINNHUB_KEY) {
    return NextResponse.json({ error: "Missing FINNHUB_KEY" }, { status: 500 });
  }
  const symbol = req.nextUrl.searchParams.get("symbol");
  const label = req.nextUrl.searchParams.get("label") ?? symbol ?? "";
  const tfParam = (req.nextUrl.searchParams.get("timeframe") ?? "1m") as Timeframe;
  const timeframe: Timeframe = tfParam in TF_SECONDS ? tfParam : "1m";

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
  }

  const to = Math.floor(Date.now() / 1000);
  const from = to - TF_SECONDS[timeframe];
  const resolution = TF_RESOLUTION[timeframe];
  const encoded = encodeURIComponent(symbol);

  try {
    const [candleRes, quoteRes] = await Promise.all([
      fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${encoded}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_KEY}`
      ),
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encoded}&token=${FINNHUB_KEY}`
      ),
    ]);

    if (!quoteRes.ok) {
      return NextResponse.json(
        { error: `Finnhub quote ${quoteRes.status}` },
        { status: 502 }
      );
    }

    const quoteRaw = (await quoteRes.json()) as FinnhubQuote;
    const candleRaw = candleRes.ok
      ? ((await candleRes.json()) as FinnhubCandle)
      : { s: "no_data" };

    const series: CandlePoint[] =
      candleRaw.s === "ok" && candleRaw.t && candleRaw.c
        ? candleRaw.t.map((t, i) => ({ t: t * 1000, c: candleRaw.c![i] }))
        : [];

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
