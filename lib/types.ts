export type Timeframe = "24h" | "1w" | "1m" | "6m" | "1y" | "5y";

export interface StockSymbol {
  symbol: string;
  label: string;
}

export interface CandlePoint {
  t: number;
  c: number;
}

export interface StockData {
  symbol: string;
  label: string;
  current: number;
  changePct24h: number;
  high: number;
  low: number;
  series: CandlePoint[];
}

export interface NewsArticle {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
}

export interface NewsBucket {
  past24h: NewsArticle[];
  pastWeek: NewsArticle[];
}

export interface RatePoint {
  date: string;
  value: number;
}

export interface FedFundsData {
  current: number;
  history: RatePoint[];
}

export interface MortgageRateData {
  fha30: number;
  conv30: number;
  history: {
    fha30: RatePoint[];
    conv30: RatePoint[];
  };
}

export interface FuelPriceData {
  avgLL100: number;
  avgJetA: number;
  asOf: string;
}

export interface DashboardSnapshot {
  fetchedAt: number;
  stocks: Record<string, StockData | null>;
  news: NewsBucket | null;
  fedFunds: FedFundsData | null;
  mortgage: MortgageRateData | null;
  fuel: FuelPriceData | null;
}
