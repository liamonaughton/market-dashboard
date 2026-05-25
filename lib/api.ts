import {
  FuelPriceData,
  MortgageRateData,
  RatePoint,
  StockSymbol,
} from "./types";

export const STOCK_SYMBOLS: StockSymbol[] = [
  { symbol: "QQQ", label: "NASDAQ 100" },
  { symbol: "SPY", label: "S&P 500" },
  { symbol: "DIA", label: "DOW" },
  { symbol: "VTI", label: "VTI" },
];

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
