import { BatteryMedium, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { formatNaira } from "@/lib/business";
import { cart } from "@/lib/cart";
import { WhatsAppButton } from "./Layout";

export function ProductCard({ product }: { product: Product }) {
  const [storage, setStorage] = useState(product.storage[0]);
  const [condition, setCondition] = useState(product.conditions[0]);
  const [added, setAdded] = useState(false);
  const sizeLabel = product.category === "Apple Watch" ? "Case size" : "Storage";

  const add = () => {
    cart.add({ productId: product.id, name: product.name, option: storage, condition });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square bg-muted">
        <img
          src={product.image}
          alt={`${product.name} (illustrative photo)`}
          loading="lazy"
          width={816}
          height={816}
          className="h-full w-full object-cover"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-2.5 py-1 text-xs font-bold text-foreground">
            New In
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs text-muted-foreground">
          {product.family}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold">{product.name}</h3>
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
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BatteryMedium className="h-4 w-4 shrink-0" />
            Battery health: tested &amp; confirmed per unit
          </p>
        </div>

        <div className="mt-auto grid gap-2 pt-5">
          <button
            onClick={add}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? "Added to order" : "Add to order"}
          </button>
          <WhatsAppButton
            className="w-full"
            message={`Hello Opeyemi Phone & Gadgets, I'm interested in the ${product.name} (${storage}, ${condition}). Is it available and what's the price?`}
          >
            Buy via WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
