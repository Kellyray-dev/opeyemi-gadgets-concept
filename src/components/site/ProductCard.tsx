import { BatteryMedium, ShoppingBag, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog";
import { formatNaira } from "@/lib/business";
import { cart } from "@/lib/cart";
import { WhatsAppButton } from "./Layout";

export function ProductCard({ product }: { product: Product }) {
  const [storage, setStorage] = useState<string>(product.storage[0] ?? "");
  const [condition, setCondition] = useState<string>(product.conditions[0] ?? "New");
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const sizeLabel = product.category === "Apple Watch" ? "Case size" : "Storage";

  const add = () => {
    cart.add({ productId: product.id, name: product.name, option: storage, condition });
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="relative aspect-[4/3] bg-muted sm:aspect-square">
        <img
          src={product.image}
          alt={`Illustrative ${product.category} concept image; not a verified photo of ${product.name}`}
          loading="lazy"
          decoding="async"
          width={816}
          height={816}
          className="h-full w-full object-contain p-6"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-2.5 py-1 text-xs font-bold text-foreground">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-background/95 px-2.5 py-1 text-xs text-muted-foreground">
          {product.family}
        </span>
        <span className="absolute inset-x-0 bottom-0 bg-background/95 px-3 py-1.5 text-center text-xs text-muted-foreground">Concept image · exact model photo pending</span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-xl font-bold leading-snug">{product.name}</h3>
        <p className="mt-1 font-semibold text-primary">{formatNaira(product.price)}</p>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{sizeLabel}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={`${product.name} ${sizeLabel}`}>
              {product.storage.map((s) => (
                <Button variant="outline"
                  key={s}
                  aria-pressed={s === storage}
                  onClick={() => setStorage(s)}
                  className={`min-h-11 px-3 text-sm ${s === storage ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "hover:border-primary"}`}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Preferred condition</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={`${product.name} preferred condition`}>
              {product.conditions.map((c) => (
                <Button variant="outline"
                  key={c}
                  aria-pressed={c === condition}
                  onClick={() => setCondition(c)}
                  className={`min-h-11 px-3 text-sm ${c === condition ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "hover:border-primary"}`}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BatteryMedium className="h-4 w-4 shrink-0" />
            Ask about battery health and availability
          </p>
        </div>

        <div className="mt-auto grid gap-2 pt-5">
          <Button variant="outline"
            onClick={add}
            aria-label={added ? "Added to order" : "Add to order"}
            className="min-h-12 w-full border-primary text-primary"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            <span role="status" aria-live="polite">{added ? "Added to order" : "Add to order"}</span>
          </Button>
          <WhatsAppButton
            className="w-full"
            message={`Hello Opeyemi Phone & Gadgets, I'm interested in the ${product.name} (${storage}, ${condition}). Is it available and what's the price?`}
          >
            Enquire on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
