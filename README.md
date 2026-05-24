# Market Dashboard

A single-page Next.js dashboard showing stock charts, news, fed funds rate, mortgage rates, and fuel prices. Data refreshes once per day (tracked via `localStorage`).

## Setup

```bash
npm install
cp .env.local.example .env.local
# add your API keys
npm run dev
```

## API Keys

- `NEXT_PUBLIC_FINNHUB_KEY` — https://finnhub.io
- `NEXT_PUBLIC_NEWSAPI_KEY` — https://newsapi.org
- `NEXT_PUBLIC_FRED_KEY` — https://fred.stlouisfed.org/docs/api/api_key.html

Fuel prices (100LL, Jet A) and mortgage rates (30yr FHA & Conv) use mock data — swap in real APIs in `lib/api.ts`.

## Deploy

Push to GitHub and import into Vercel. Set the three `NEXT_PUBLIC_*` env vars in the Vercel project settings.

## Notes

- NewsAPI's developer plan blocks browser requests in production. For deployed builds, proxy NewsAPI through a server route or upgrade your plan.
- `npm audit` reports a few Next 14 advisories (Image Optimizer remotePatterns, RSC request handling, rewrites, `next/image` cache). This app uses none of those features, so the advisories don't affect it. To clear the audit anyway, upgrade to Next 15 — note that 15 requires React 19.
