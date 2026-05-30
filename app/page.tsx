"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  STOCK_SYMBOLS,
  fetchFuelPrices,
  fetchMortgageRates,
} from "@/lib/api";
import {
  DashboardSnapshot,
  FedFundsData,
  NewsBucket,
  StockData,
} from "@/lib/types";
import FuelPrices from "@/components/FuelPrices";
import StockTicker from "@/components/StockTicker";
import RateCard from "@/components/RateCard";
import NewsHeadlines from "@/components/NewsHeadlines";

const STORAGE_KEY = "market-dashboard:snapshot:v2";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = useCallback(async (): Promise<DashboardSnapshot> => {
    const stockEntries = await Promise.all(
      STOCK_SYMBOLS.map(async (sym) => {
        try {
          const params = new URLSearchParams({
            symbol: sym.symbol,
            label: sym.label,
          });
          const url = `/api/stocks?${params.toString()}`;
          console.log("[dashboard] fetching", url);
          const res = await fetch(url);
          if (!res.ok) {
            const body = await res.text();
            console.error("[dashboard] /api/stocks failed", sym.symbol, res.status, body);
            throw new Error(`/api/stocks ${res.status}`);
          }
          const data = (await res.json()) as StockData;
          console.log("[dashboard] stocks ok", sym.symbol, data.current);
          return [sym.symbol, data] as const;
        } catch (e) {
          console.error("[dashboard] stock fetch failed", sym.symbol, e);
          return [sym.symbol, null] as const;
        }
      })
    );

    const [news, fedFunds, mortgage, fuel] = await Promise.all([
      (async () => {
        try {
          console.log("[dashboard] fetching /api/news");
          const res = await fetch("/api/news");
          if (!res.ok) {
            const body = await res.text();
            console.error("[dashboard] /api/news failed", res.status, body);
            throw new Error(`/api/news ${res.status}`);
          }
          const data = (await res.json()) as NewsBucket;
          console.log(
            "[dashboard] news ok",
            data.past24h?.length ?? 0,
            data.pastWeek?.length ?? 0
          );
          return data;
        } catch (e) {
          console.error("[dashboard] news fetch failed", e);
          return null;
        }
      })(),
      (async () => {
        try {
          console.log("[dashboard] fetching /api/fed");
          const res = await fetch("/api/fed");
          if (!res.ok) {
            const body = await res.text();
            console.error("[dashboard] /api/fed failed", res.status, body);
            throw new Error(`/api/fed ${res.status}`);
          }
          const data = (await res.json()) as FedFundsData;
          console.log("[dashboard] fed ok", data.current);
          return data;
        } catch (e) {
          console.error("[dashboard] fed funds fetch failed", e);
          return null;
        }
      })(),
      fetchMortgageRates().catch((e) => {
        console.error("[dashboard] mortgage fetch failed", e);
        return null;
      }),
      fetchFuelPrices().catch((e) => {
        console.error("[dashboard] fuel fetch failed", e);
        return null;
      }),
    ]);

    return {
      fetchedAt: Date.now(),
      stocks: Object.fromEntries(stockEntries),
      news,
      fedFunds,
      mortgage,
      fuel,
    };
  }, []);

  const persist = (snap: DashboardSnapshot) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
    } catch (e) {
      console.warn("localStorage write failed", e);
    }
  };

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const fresh = await loadAll();
      setSnapshot(fresh);
      persist(fresh);
    } finally {
      setRefreshing(false);
    }
  }, [loadAll]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let cached: DashboardSnapshot | null = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) cached = JSON.parse(raw) as DashboardSnapshot;
      } catch (e) {
        console.warn("localStorage read failed", e);
      }

      const stale = !cached || Date.now() - cached.fetchedAt > ONE_DAY_MS;

      if (cached && !stale) {
        if (!cancelled) {
          setSnapshot(cached);
          setLoading(false);
        }
        return;
      }

      if (cached && !cancelled) setSnapshot(cached);

      try {
        const fresh = await loadAll();
        if (!cancelled) {
          setSnapshot(fresh);
          persist(fresh);
        }
      } catch (e) {
        console.error("initial load failed", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadAll]);

  const stocks: Record<string, StockData | null> = useMemo(
    () => snapshot?.stocks ?? {},
    [snapshot]
  );

  const fedSeries = snapshot?.fedFunds
    ? [
        {
          label: "Effective Fed Funds Rate",
          current: snapshot.fedFunds.current,
          data: snapshot.fedFunds.history.slice(-180),
          color: "#3b82f6",
        },
      ]
    : [];

  const mortgageSeries = snapshot?.mortgage
    ? [
        {
          label: "30yr FHA",
          current: snapshot.mortgage.fha30,
          data: snapshot.mortgage.history.fha30,
          color: "#a855f7",
        },
        {
          label: "30yr Conventional",
          current: snapshot.mortgage.conv30,
          data: snapshot.mortgage.history.conv30,
          color: "#f59e0b",
        },
      ]
    : [];

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Market Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted">
              {snapshot?.fetchedAt
                ? `Last updated ${new Date(snapshot.fetchedAt).toLocaleString()}`
                : loading
                  ? "Loading…"
                  : "No data yet"}
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-sm text-white transition hover:border-accent disabled:opacity-60"
          >
            {refreshing ? "Refreshing…" : "Refresh now"}
          </button>
        </header>
      </div>

      <StockTicker stocks={stocks} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <FuelPrices data={snapshot?.fuel ?? null} />
          <RateCard
            title="Fed Funds Rate"
            subtitle="Effective rate, 6-month window"
            series={fedSeries}
            badge="FRED"
          />
          <RateCard
            title="Mortgage Rates"
            subtitle="30-year, last 52 weeks"
            series={mortgageSeries}
            badge="Mock data"
          />
        </div>

        <div className="mt-8">
          <NewsHeadlines news={snapshot?.news ?? null} />
        </div>

        <footer className="mt-10 text-center text-xs text-muted/70">
          Data refreshes once per day · stored locally in your browser
        </footer>
      </div>
    </main>
  );
}
