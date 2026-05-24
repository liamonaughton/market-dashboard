"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { RatePoint } from "@/lib/types";
import Card from "./Card";

interface SparklineSeries {
  label: string;
  current: number;
  data: RatePoint[];
  color: string;
}

interface RateCardProps {
  title: string;
  subtitle?: string;
  series: SparklineSeries[];
  badge?: string;
}

export default function RateCard({ title, subtitle, series, badge }: RateCardProps) {
  if (!series.length) {
    return (
      <Card title={title} subtitle={subtitle}>
        <p className="text-sm text-muted">Data unavailable</p>
      </Card>
    );
  }

  return (
    <Card
      title={title}
      subtitle={subtitle}
      right={
        badge ? (
          <span className="rounded-full bg-surface-elevated px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
            {badge}
          </span>
        ) : null
      }
    >
      <div className="space-y-5">
        {series.map((s) => (
          <Sparkline key={s.label} series={s} />
        ))}
      </div>
    </Card>
  );
}

function Sparkline({ series }: { series: SparklineSeries }) {
  const id = series.label.replace(/[^a-z0-9]/gi, "");
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-xs uppercase tracking-wide text-muted">{series.label}</p>
        <p className="font-mono text-2xl text-white">
          {series.current.toFixed(2)}
          <span className="ml-1 text-sm text-muted">%</span>
        </p>
      </div>
      <div className="mt-2 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series.data}>
            <defs>
              <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={series.color} stopOpacity={0.45} />
                <stop offset="100%" stopColor={series.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Tooltip
              contentStyle={{
                background: "#0a0e1a",
                border: "1px solid #243049",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelFormatter={() => ""}
              formatter={(v: number, _n, item: { payload?: RatePoint }) => [
                `${v.toFixed(2)}%`,
                item.payload?.date ?? "",
              ]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={series.color}
              strokeWidth={1.5}
              fill={`url(#spark-${id})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
