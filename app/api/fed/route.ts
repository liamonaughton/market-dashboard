import { NextResponse } from "next/server";
import { FedFundsData, RatePoint } from "@/lib/types";

const FRED_KEY = process.env.FRED_KEY ?? "";

interface FredObservation {
  date: string;
  value: string;
}

interface FredResponse {
  observations?: FredObservation[];
}

export const dynamic = "force-dynamic";

export async function GET() {
  if (!FRED_KEY) {
    return NextResponse.json({ error: "Missing FRED_KEY" }, { status: 500 });
  }
  const start = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const url =
    "https://api.stlouisfed.org/fred/series/observations?" +
    new URLSearchParams({
      series_id: "DFF",
      api_key: FRED_KEY,
      file_type: "json",
      observation_start: start,
    }).toString();
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: `FRED ${res.status}` },
        { status: 502 }
      );
    }
    const data = (await res.json()) as FredResponse;
    const history: RatePoint[] = (data.observations ?? [])
      .filter((o) => o.value !== "." && o.value !== "")
      .map((o) => ({ date: o.date, value: Number(o.value) }));
    const current = history.length ? history[history.length - 1].value : 0;
    const fedData: FedFundsData = { current, history };
    return NextResponse.json(fedData);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 500 }
    );
  }
}
