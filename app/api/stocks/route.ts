import { NextRequest, NextResponse } from "next/server";
import { StockData } from "@/lib/types";

const FINNHUB_KEY = process.env.FINNHUB_KEY ?? "";

interface FinnhubQuote {
  c: number;
  dp: number;
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
    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`
    );

    if (!quoteRes.ok) {
      return NextResponse.json(
        { error: `Finnhub quote ${quoteRes.status}` },
        { status: 502 }
      );
    }
    const quoteRaw = (await quoteRes.json()) as FinnhubQuote;

    const data: StockData = {
      symbol,
      label,
      current: quoteRaw.c,
      changePct24h: quoteRaw.dp,
    };
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 500 }
    );
  }
}
