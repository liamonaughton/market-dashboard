import { FuelPriceData } from "@/lib/types";
import Card from "./Card";

interface FuelPricesProps {
  data: FuelPriceData | null;
}

export default function FuelPrices({ data }: FuelPricesProps) {
  return (
    <Card
      title="Fuel Prices"
      subtitle="National average, USD per gallon"
      right={
        data ? (
          <span className="rounded-full bg-surface-elevated px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
            Mock data
          </span>
        ) : null
      }
    >
      {data ? (
        <div className="grid grid-cols-2 gap-4">
          <PriceCell label="100LL Avg" price={data.avgLL100} />
          <PriceCell label="Jet A Avg" price={data.avgJetA} />
        </div>
      ) : (
        <p className="text-sm text-muted">Data unavailable</p>
      )}
    </Card>
  );
}

function PriceCell({ label, price }: { label: string; price: number }) {
  return (
    <div className="rounded-lg bg-surface-elevated p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-mono text-3xl text-white">
        ${price.toFixed(2)}
        <span className="ml-1 text-sm text-muted">/gal</span>
      </p>
    </div>
  );
}
