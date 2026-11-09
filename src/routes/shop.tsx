import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS, filterProducts, type Category, type Condition } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop iPhones, MacBooks & Apple Watches — Opeyemi Phone & Gadgets" },
      { name: "description", content: "Browse new and UK used iPhones, MacBooks and Apple Watches. Request prices on WhatsApp." },
      { property: "og:title", content: "Shop — Opeyemi Phone & Gadgets" },
      { property: "og:description", content: "Explore illustrative Apple device listings in this independent concept preview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { category?: Category | "All" } => {
    const c = s["category"] as string | undefined;
    return c && (c === "All" || (CATEGORIES as string[]).includes(c)) ? { category: c as Category | "All" } : {};
  },
  component: Shop,
});

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <Button variant="outline"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 shrink-0 px-4 ${active ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "bg-card hover:border-primary"}`}
    >
      {children}
    </Button>
  );
}

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const category = search.category ?? "All";
  const setCategory = (c: Category | "All") => navigate({ search: { category: c }, replace: true });
  const [condition, setCondition] = useState<Condition | "All">("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => filterProducts(PRODUCTS, { category, condition, q }), [category, condition, q]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          Concept listings, not confirmed stock. Request prices and availability on WhatsApp.
        </p>
         <p className="mt-1 text-xs text-muted-foreground">Illustrative images do not verify model appearance or stock. <Link to="/checkout" className="font-semibold text-primary">View your order →</Link></p>

        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-2 rounded-full border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              aria-label="Search devices"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search e.g. 13 Pro Max"
              className="w-full min-w-0 bg-transparent text-base outline-none"
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

         <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">{list.length} devices</p>
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
