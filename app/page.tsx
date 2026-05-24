"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  STOCK_SYMBOLS,
  fetchFedFunds,
  fetchFuelPrices,
  fetchMortgageRates,
  fetchNews,
  fetchStock,
} from "@/lib/api";
import {
  DashboardSnapshot,
  StockData,
  Timeframe,
} from "@/lib/types";
import FuelPrices from "@/components/FuelPrices";
import StockCharts from "@/components/StockCharts";
import RateCard from "@/components/RateCard";
import NewsHeadlines from "@/components/NewsHeadlines";

const STORAGE_KEY = "market-dashboard:snapshot:v1";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_TF: Timeframe = "1m";

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeframes, setTimeframes] = useState<Record<string, Timeframe>>(() =>
    Object.fromEntries(STOCK_SYMBOLS.map((s) => [s.symbol, DEFAULT_TF]))
  );

  const loadAll = useCallback(async (): Promise<DashboardSnapshot> => {
    const stockEntries = await Promise.all(
      STOCK_SYMBOLS.map(async (sym) => {
        try {
          const data = await fetchStock(sym, DEFAULT_TF);
          return [sym.symbol, data] as const;
        } catch (e) {
          console.error("stock fetch failed", sym.symbol, e);
          return [sym.symbol, null] as const;
        }
      })
    );

    const [news, fedFunds, mortgage, fuel] = await Promise.all([
      fetchNews().catch((e) => {
        console.error("news fetch failed", e);
        return null;
      }),
      fetchFedFunds().catch((e) => {
        console.error("fed funds fetch failed", e);
        return null;
      }),
      fetchMortgageRates().catch((e) => {
        console.error("mortgage fetch failed", e);
        return null;
      }),
      fetchFuelPrices().catch((e) => {
        console.error("fuel fetch failed", e);
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

  const handleTimeframeChange = useCallback(
    async (symbol: string, tf: Timeframe) => {
      setTimeframes((prev) => ({ ...prev, [symbol]: tf }));
      const sym = STOCK_SYMBOLS.find((s) => s.symbol === symbol);
      if (!sym) return;
      try {
        const data = await fetchStock(sym, tf);
        setSnapshot((prev) => {
          const base: DashboardSnapshot =
            prev ?? {
              fetchedAt: Date.now(),
              stocks: {},
              news: null,
              fedFunds: null,
              mortgage: null,
              fuel: null,
            };
          const next: DashboardSnapshot = {
            ...base,
            stocks: { ...base.stocks, [symbol]: data },
          };
          persist(next);
          return next;
        });
      } catch (e) {
        console.error("timeframe fetch failed", e);
        setSnapshot((prev) =>
          prev
            ? { ...prev, stocks: { ...prev.stocks, [symbol]: null } }
            : prev
        );
      }
    },
    []
  );

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
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
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
        <StockCharts
          stocks={stocks}
          onTimeframeChange={handleTimeframeChange}
          timeframes={timeframes}
        />
      </div>

      <div className="mt-8">
        <NewsHeadlines news={snapshot?.news ?? null} />
      </div>

      <footer className="mt-10 text-center text-xs text-muted/70">
        Data refreshes once per day · stored locally in your browser
      </footer>
    </main>
  );
}
