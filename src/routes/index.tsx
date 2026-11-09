import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Repeat, MessageCircle, ArrowRight } from "lucide-react";
import heroMobile from "@/assets/hero-mobile.webp.asset.json";
import heroDesktop from "@/assets/hero-desktop.webp.asset.json";
import { SiteLayout, WhatsAppButton } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS, CATEGORIES, CATEGORY_INFO } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Opeyemi Phone & Gadgets — New & UK Used iPhones in Nigeria" },
      { name: "description", content: "Independent Opeyemi Phone & Gadgets concept preview. Explore iPhones, MacBooks, Apple Watches and swap enquiries." },
      { property: "og:title", content: "Opeyemi Phone & Gadgets — We Buy, We Sell, We Swap" },
      { property: "og:description", content: "A private design concept featuring Apple devices and WhatsApp enquiries, not confirmed inventory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TRUST = [
  { icon: MessageCircle, title: "Price enquiries", text: "Ask the shop directly" },
  { icon: ShieldCheck, title: "New & UK Used", text: "Request your preferred condition" },
  { icon: Truck, title: "Delivery enquiries", text: "Confirm options with the shop" },
  { icon: Repeat, title: "Buy · Sell · Swap", text: "Upgrade your old phone" },
];

function Index() {
  const newIn = PRODUCTS.filter((p) => p.isNew).slice(0, 6);
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={heroDesktop.url} srcSet={`${heroMobile.url} 640w, ${heroDesktop.url} 1280w`} sizes="100vw" alt="Illustrative gadget collection for this concept" fetchPriority="high" decoding="async" width={1600} height={1104} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-primary/35" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <p className="text-xs font-semibold text-primary-foreground">
            New &amp; UK Used · Buy · Sell · Swap
          </p>
          <h1 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Opeyemi Phone &amp; Gadgets
          </h1>
          <p className="mt-4 max-w-md text-primary-foreground/85">
            iPhones, MacBooks and Apple Watches — we buy, we sell, we swap.
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <Button asChild variant="secondary" className="min-h-12">
            <Link to="/shop" search={{ category: "iPhone" }} className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-primary">
              Browse iPhones <ArrowRight className="h-4 w-4" />
            </Link>
            </Button>
            <WhatsAppButton message="Hello Opeyemi Phone & Gadgets, I'd like to make an enquiry." />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-10 md:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="min-w-0 border-l-2 border-primary pl-3">
            <t.icon className="h-6 w-6 text-primary" />
            <p className="mt-2 text-sm font-semibold">{t.title}</p>
            <p className="text-xs text-muted-foreground">{t.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="font-display text-3xl font-bold">Shop by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ category: c }}
              className="group flex min-w-0 items-center gap-4 overflow-hidden rounded-lg border bg-card p-3 transition hover:shadow-md sm:flex-col sm:items-stretch sm:p-0"
            >
              <img src={CATEGORY_INFO[c].image} alt={`${c} example model`} loading="lazy" decoding="async" width={816} height={816} className="h-20 w-20 shrink-0 rounded-md object-contain sm:aspect-[4/3] sm:h-auto sm:w-full sm:rounded-none" />
              <div className="sm:p-4">
                <p className="font-display text-lg font-bold">{c}</p>
                <p className="text-sm text-muted-foreground">{CATEGORY_INFO[c].blurb}</p>
                <p className="mt-1 text-sm font-semibold text-primary">Browse →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary">Concept selection · not stock</p>
            <h2 className="font-display text-3xl font-bold">Featured models</h2>
          </div>
          <Link to="/shop" search={{ category: "All" }} className="shrink-0 text-sm font-semibold text-primary">View all →</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newIn.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-display text-3xl font-bold">We Buy. We Sell. We Swap.</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Got an old phone? Sell it for cash or swap it towards an upgrade.
        </p>
        <Button asChild className="mt-6 min-h-12"><Link to="/swap">
          Start a swap enquiry <ArrowRight className="h-4 w-4" />
        </Link></Button>
      </section>
    </SiteLayout>
  );
}
