import {
  CandlePoint,
  FedFundsData,
  FuelPriceData,
  MortgageRateData,
  NewsArticle,
  NewsBucket,
  RatePoint,
  StockData,
  StockSymbol,
  Timeframe,
} from "./types";

const FINNHUB_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY ?? "";
const NEWSAPI_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY ?? "";
const FRED_KEY = process.env.NEXT_PUBLIC_FRED_KEY ?? "";

export const STOCK_SYMBOLS: StockSymbol[] = [
  { symbol: "^NDX", label: "NASDAQ 100" },
  { symbol: "^GSPC", label: "S&P 500" },
  { symbol: "^DJI", label: "DOW" },
  { symbol: "VTI", label: "VTI" },
];

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

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${url}`);
  }
  return res.json() as Promise<T>;
}

interface FinnhubCandle {
  s: string;
  t?: number[];
  c?: number[];
  h?: number[];
  l?: number[];
}

interface FinnhubQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  pc: number;
}

export async function fetchStock(
  symbol: StockSymbol,
  timeframe: Timeframe
): Promise<StockData> {
  if (!FINNHUB_KEY) throw new Error("Missing NEXT_PUBLIC_FINNHUB_KEY");
  const to = Math.floor(Date.now() / 1000);
  const from = to - TF_SECONDS[timeframe];
  const resolution = TF_RESOLUTION[timeframe];
  const encoded = encodeURIComponent(symbol.symbol);

  const [candleRaw, quoteRaw] = await Promise.all([
    fetchJson<FinnhubCandle>(
      `https://finnhub.io/api/v1/stock/candle?symbol=${encoded}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_KEY}`
    ),
    fetchJson<FinnhubQuote>(
      `https://finnhub.io/api/v1/quote?symbol=${encoded}&token=${FINNHUB_KEY}`
    ),
  ]);

  const series: CandlePoint[] =
    candleRaw.s === "ok" && candleRaw.t && candleRaw.c
      ? candleRaw.t.map((t, i) => ({ t: t * 1000, c: candleRaw.c![i] }))
      : [];

  const closes = series.map((p) => p.c);
  const high = closes.length ? Math.max(...closes) : quoteRaw.h;
  const low = closes.length ? Math.min(...closes) : quoteRaw.l;

  return {
    symbol: symbol.symbol,
    label: symbol.label,
    current: quoteRaw.c,
    changePct24h: quoteRaw.dp,
    high,
    low,
    series,
  };
}

interface NewsApiArticle {
  title: string;
  source: { name: string };
  publishedAt: string;
  url: string;
}

interface NewsApiResponse {
  status: string;
  articles: NewsApiArticle[];
}

async function fetchHeadlines(fromIso: string): Promise<NewsArticle[]> {
  if (!NEWSAPI_KEY) throw new Error("Missing NEXT_PUBLIC_NEWSAPI_KEY");
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
  const data = await fetchJson<NewsApiResponse>(url);
  return (data.articles ?? []).map((a) => ({
    title: a.title,
    source: a.source?.name ?? "Unknown",
    publishedAt: a.publishedAt,
    url: a.url,
  }));
}

export async function fetchNews(): Promise<NewsBucket> {
  const now = Date.now();
  const day = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const week = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [past24h, pastWeek] = await Promise.all([
    fetchHeadlines(day),
    fetchHeadlines(week),
  ]);
  return { past24h, pastWeek };
}

interface FredResponse {
  observations: { date: string; value: string }[];
}

async function fetchFredSeries(
  seriesId: string,
  startDate: string
): Promise<RatePoint[]> {
  if (!FRED_KEY) throw new Error("Missing NEXT_PUBLIC_FRED_KEY");
  const url =
    "https://api.stlouisfed.org/fred/series/observations?" +
    new URLSearchParams({
      series_id: seriesId,
      api_key: FRED_KEY,
      file_type: "json",
      observation_start: startDate,
    }).toString();
  const data = await fetchJson<FredResponse>(url);
  return (data.observations ?? [])
    .filter((o) => o.value !== "." && o.value !== "")
    .map((o) => ({ date: o.date, value: Number(o.value) }));
}

export async function fetchFedFunds(): Promise<FedFundsData> {
  const start = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const history = await fetchFredSeries("DFF", start);
  const current = history.length ? history[history.length - 1].value : 0;
  return { current, history };
}

export async function fetchMortgageRates(): Promise<MortgageRateData> {
  const today = new Date();
  const history: RatePoint[] = [];
  const fhaHistory: RatePoint[] = [];
  for (let i = 51; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 7);
    const date = d.toISOString().slice(0, 10);
    const wave = Math.sin(i / 6) * 0.4 + Math.cos(i / 14) * 0.25;
    history.push({ date, value: Number((6.95 + wave).toFixed(3)) });
    fhaHistory.push({ date, value: Number((6.55 + wave * 0.9).toFixed(3)) });
  }
  return {
    conv30: history[history.length - 1].value,
    fha30: fhaHistory[fhaHistory.length - 1].value,
    history: { conv30: history, fha30: fhaHistory },
  };
}

export async function fetchFuelPrices(): Promise<FuelPriceData> {
  return {
    avgLL100: 6.42,
    avgJetA: 5.78,
    asOf: new Date().toISOString(),
  };
}
