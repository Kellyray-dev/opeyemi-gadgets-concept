import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS, filterProducts, type Category, type Condition } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop iPhones, MacBooks & Apple Watches — Opeyemi Phone & Gadgets" },
      { name: "description", content: "Browse new and UK used iPhones, MacBooks and Apple Watches. Request prices on WhatsApp." },
      { property: "og:title", content: "Shop — Opeyemi Phone & Gadgets" },
      { property: "og:description", content: "New & UK used Apple devices with nationwide delivery in Nigeria." },
    ],
  }),
  component: Shop,
});

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}
    >
      {children}
    </button>
  );
}

function Shop() {
  const [category, setCategory] = useState<Category | "All">("iPhone");
  const [condition, setCondition] = useState<Condition | "All">("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => filterProducts(PRODUCTS, { category, condition, q }), [category, condition, q]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          Prices change with stock — tap any device to request the current price on WhatsApp.
        </p>

        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-2 rounded-full border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search e.g. 13 Pro Max"
              className="w-full min-w-0 bg-transparent text-sm outline-none"
            />
          </label>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>
            ))}
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {(["All", "New", "UK Used"] as const).map((c) => (
              <Chip key={c} active={condition === c} onClick={() => setCondition(c)}>
                {c === "All" ? "Any condition" : c}
              </Chip>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{list.length} devices</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        {list.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No devices match. Try another search.</p>
        )}
      </section>
    </SiteLayout>
  );
}
