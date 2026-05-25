# Market Dashboard

A single-page Next.js dashboard showing 1-month stock charts (QQQ/SPY/DIA/VTI), news, fed funds rate, mortgage rates, and fuel prices. Data refreshes once per day (tracked via `localStorage`).

## Setup

```bash
npm install
cp .env.local.example .env.local
# add your API keys
npm run dev
```

## API Keys

All API keys are **server-side only** — they live in route handlers under `app/api/*` and are never shipped to the browser bundle.

- `FINNHUB_KEY` — https://finnhub.io (used for current price + 24h change)
- `ALPHA_VANTAGE_KEY` — https://www.alphavantage.co (used for 1-month daily price series — free tier is **25 requests/day**, so refreshes are limited; daily cache keeps this well under the cap in normal use)
- `NEWSAPI_KEY` — https://newsapi.org
- `FRED_KEY` — https://fred.stlouisfed.org/docs/api/api_key.html

The client calls internal routes (`/api/stocks`, `/api/news`, `/api/fed`); those routes call the upstream APIs with the secret keys. When Alpha Vantage rate-limits, the chart shows "No chart data for this range" while the quote still renders.

Fuel prices (100LL, Jet A) and mortgage rates (30yr FHA & Conv) use mock data — swap in real APIs in `lib/api.ts` (or move them to API routes too if they need secret keys).

## Symbols

Finnhub doesn't support the bare index tickers (`^NDX`, `^GSPC`, `^DJI`) on the free plan, so the dashboard tracks tracking-ETFs instead:

| Label | Symbol |
| --- | --- |
| NASDAQ 100 | QQQ |
| S&P 500 | SPY |
| DOW | DIA |
| VTI | VTI |

## Deploy

Push to GitHub and import into Vercel. In the Vercel project settings, add four env vars: `FINNHUB_KEY`, `ALPHA_VANTAGE_KEY`, `NEWSAPI_KEY`, `FRED_KEY` (no `NEXT_PUBLIC_` prefix).

## Notes

- `npm audit` reports a few Next 14 advisories (Image Optimizer remotePatterns, RSC request handling, rewrites, `next/image` cache). This app uses none of those features, so the advisories don't affect it. To clear the audit anyway, upgrade to Next 15 — note that 15 requires React 19.
