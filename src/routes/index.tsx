import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Repeat, BadgeCheck, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import inventory from "@/assets/inventory.png.asset.json";
import { SiteLayout, WhatsAppButton } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Opeyemi Phone & Gadgets — New & UK Used iPhones in Nigeria" },
      { name: "description", content: "Buy, sell and swap iPhones, MacBooks and Apple Watches. New & UK used, nationwide delivery. WhatsApp 09030393902." },
      { property: "og:title", content: "Opeyemi Phone & Gadgets — We Buy, We Sell, We Swap" },
      { property: "og:description", content: "Quality new & UK used iPhones and gadgets with nationwide delivery across Nigeria." },
    ],
  }),
  component: Index,
});

const TRUST = [
  { icon: BadgeCheck, title: "CAC Registered", text: BUSINESS.bn },
  { icon: ShieldCheck, title: "New & UK Used", text: "Condition stated clearly" },
  { icon: Truck, title: "Nationwide Delivery", text: "Anywhere in Nigeria" },
  { icon: Repeat, title: "Buy · Sell · Swap", text: "Upgrade your old phone" },
];

function Index() {
  const featured = PRODUCTS.filter((p) => p.category === "iPhone").slice(0, 6);
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={hero} alt="Range of iPhones and an Apple Watch" width={1600} height={1104} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="inline-block rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-foreground">
            New &amp; UK Used · Nationwide Delivery
          </p>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            Quality gadgets at the best price.
          </h1>
          <p className="mt-4 max-w-md text-primary-foreground/85">
            iPhones, MacBooks and Apple Watches — we buy, we sell, we swap.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-primary">
              Browse iPhones <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton message="Hello Opeyemi Phone & Gadgets, I'd like to make an enquiry." />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-10 md:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="rounded-xl border bg-card p-4">
            <t.icon className="h-6 w-6 text-primary" />
            <p className="mt-2 text-sm font-semibold">{t.title}</p>
            <p className="text-xs text-muted-foreground">{t.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">Popular iPhones</h2>
          <Link to="/shop" className="shrink-0 text-sm font-semibold text-primary">View all →</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2">
          <img src={inventory.url} alt="Recent iPhone stock laid out at the shop" loading="lazy" className="mx-auto max-h-[480px] rounded-2xl object-cover shadow-lg" />
          <div>
            <p className="text-sm font-semibold text-brand-maroon">From the shop</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Real stock, real photos.</h2>
            <p className="mt-3 text-muted-foreground">
              A recent batch shared by the shop — iPhone XR through 13 Pro Max in many colours.
              Stock moves fast, so confirm the exact model, storage and battery health on WhatsApp.
            </p>
            <WhatsAppButton className="mt-6" message="Hello, which iPhones do you have available today?">
              Ask what's available today
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-display text-3xl font-bold">We Buy. We Sell. We Swap.</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Got an old phone? Sell it for cash or swap it towards an upgrade.
        </p>
        <Link to="/swap" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Start a swap enquiry <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}
