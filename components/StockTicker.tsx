import { StockData } from "@/lib/types";
import { STOCK_SYMBOLS } from "@/lib/api";

interface StockTickerProps {
  stocks: Record<string, StockData | null>;
}

export default function StockTicker({ stocks }: StockTickerProps) {
  return (
    <div className="border-b border-border bg-black/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
        {STOCK_SYMBOLS.map((sym) => (
          <StockTickerItem
            key={sym.symbol}
            symbol={sym.symbol}
            data={stocks[sym.symbol] ?? null}
          />
        ))}
      </div>
    </div>
  );
}

interface StockTickerItemProps {
  symbol: string;
  data: StockData | null;
}

function StockTickerItem({ symbol, data }: StockTickerItemProps) {
  if (!data) {
    return (
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="font-semibold text-white">{symbol}</span>
        <span className="text-muted">—</span>
      </div>
    );
  }
  const positive = data.changePct24h >= 0;
  const colorClass = positive ? "text-positive" : "text-negative";
  return (
    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
      <span className="font-semibold text-white">{symbol}</span>
      <span className="text-white">
        {data.current.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <span className={colorClass}>
        {positive ? "+" : ""}
        {data.changePct24h.toFixed(2)}%
      </span>
    </div>
  );
}
