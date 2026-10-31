import { Smartphone, Laptop, Watch, BatteryMedium } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { formatNaira } from "@/lib/business";
import { WhatsAppButton } from "./Layout";

const ICON = { iPhone: Smartphone, MacBook: Laptop, "Apple Watch": Watch };

export function ProductCard({ product }: { product: Product }) {
  const [storage, setStorage] = useState(product.storage[0]);
  const [condition, setCondition] = useState(product.conditions[0]);
  const Icon = ICON[product.category];
  const sizeLabel = product.category === "Apple Watch" ? "Case size" : "Storage";
  return (
    <article className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          {product.family}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{product.name}</h3>
      <p className="font-semibold text-brand-maroon">{formatNaira(product.price)}</p>

      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">{sizeLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {product.storage.map((s) => (
              <button
                key={s}
                onClick={() => setStorage(s)}
                className={`rounded-md border px-2.5 py-1 text-xs ${s === storage ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Condition</p>
          <div className="flex flex-wrap gap-1.5">
            {product.conditions.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`rounded-md border px-2.5 py-1 text-xs ${c === condition ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {product.category !== "MacBook" || true ? (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BatteryMedium className="h-4 w-4 shrink-0" />
            Battery health: tested &amp; confirmed per unit
          </p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          {product.seenInInventory
            ? "Seen in recent shop stock photos — confirm availability"
            : "Availability on request"}
        </p>
      </div>

      <WhatsAppButton
        className="mt-5 w-full"
        message={`Hello Opeyemi Phone & Gadgets, I'm interested in the ${product.name} (${storage}, ${condition}). Is it available and what's the price?`}
      >
        Ask on WhatsApp
      </WhatsAppButton>
    </article>
  );
}
