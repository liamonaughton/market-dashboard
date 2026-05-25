"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StockData, StockSymbol } from "@/lib/types";
import { STOCK_SYMBOLS } from "@/lib/api";
import Card from "./Card";

interface StockChartsProps {
  stocks: Record<string, StockData | null>;
}

export default function StockCharts({ stocks }: StockChartsProps) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">
        Stock Charts
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {STOCK_SYMBOLS.map((sym) => (
          <StockChartCard
            key={sym.symbol}
            sym={sym}
            data={stocks[sym.symbol] ?? null}
          />
        ))}
      </div>
    </section>
  );
}

interface StockChartCardProps {
  sym: StockSymbol;
  data: StockData | null;
}

function StockChartCard({ sym, data }: StockChartCardProps) {
  const [hovered, setHovered] = useState(false);
  const positive = data ? data.changePct24h >= 0 : true;
  const color = positive ? "#10b981" : "#ef4444";

  return (
    <Card title={sym.label} subtitle={`${sym.symbol} · last 1 month`}>
      {data ? (
        <>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-mono text-3xl text-white">
                {data.current.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-1 font-mono text-sm" style={{ color }}>
                {positive ? "+" : ""}
                {data.changePct24h.toFixed(2)}% (24h)
              </p>
            </div>
            <div className="text-right text-xs text-muted">
              <p>
                High <span className="font-mono text-white">{formatNum(data.high)}</span>
              </p>
              <p className="mt-1">
                Low <span className="font-mono text-white">{formatNum(data.low)}</span>
              </p>
            </div>
          </div>
          <div
            className="mt-4 h-40"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {data.series.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.series}>
                  <defs>
                    <linearGradient id={`g-${sym.symbol}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={["dataMin", "dataMax"]} />
                  <Tooltip
                    contentStyle={{
                      background: "#0a0e1a",
                      border: "1px solid #243049",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelFormatter={(t) => new Date(Number(t)).toLocaleString()}
                    formatter={(v: number) => [formatNum(v), "Close"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="c"
                    stroke={color}
                    strokeWidth={hovered ? 2 : 1.5}
                    fill={`url(#g-${sym.symbol})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted">
                No chart data
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">Data unavailable</p>
      )}
    </Card>
  );
}

function formatNum(n: number) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
