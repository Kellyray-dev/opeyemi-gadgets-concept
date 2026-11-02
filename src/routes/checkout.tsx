import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, CheckCircle2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { SiteLayout, WhatsAppButton } from "@/components/site/Layout";
import { PRODUCTS } from "@/lib/catalog";
import { cart, orderMessage, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Your Order — Opeyemi Phone & Gadgets" },
      { name: "description", content: "Review your selected gadgets and checkout via WhatsApp or on the site." },
      { property: "og:title", content: "Your Order — Opeyemi Phone & Gadgets" },
      { property: "og:description", content: "Checkout via WhatsApp or continue on the site. Prices confirmed by the shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

const DELIVERY: string[] = ["Doorstep delivery (nationwide)", "Pick up from shop"];

function Checkout() {
  const items = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [delivery, setDelivery] = useState<string>(DELIVERY[0] ?? "");
  const [done, setDone] = useState(false);
  const msg = orderMessage(items, { name, state, delivery });

  if (done) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-whatsapp" />
          <h1 className="mt-4 font-display text-3xl font-bold">Order request preview</h1>
          <p className="mt-3 text-muted-foreground">
            On the live site, the shop would receive this request and contact you to confirm price,
            availability and delivery. This is a design preview — nothing was sent or charged.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/shop" search={{ category: "All" }} onClick={() => cart.clear()} className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Back to shop
            </Link>
            <WhatsAppButton message={msg}>Send on WhatsApp instead</WhatsAppButton>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">Your order</h1>
        <p className="mt-2 text-muted-foreground">Prices are confirmed by the shop before payment.</p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border bg-card p-10 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-semibold">Your order is empty</p>
            <Link to="/shop" search={{ category: "All" }} className="mt-5 inline-block rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Browse gadgets
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            <ul className="space-y-3">
              {items.map((i) => {
                const p = PRODUCTS.find((x) => x.id === i.productId);
                return (
                  <li key={i.key} className="flex gap-4 rounded-2xl border bg-card p-3">
                    {p && <img src={p.image} alt={i.name} width={816} height={816} className="h-20 w-20 shrink-0 rounded-xl object-cover" />}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{i.name}</p>
                      <p className="text-sm text-muted-foreground">{i.option} · {i.condition}</p>
                      <p className="text-sm font-semibold text-brand-maroon">Request Price</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button aria-label="Decrease" onClick={() => cart.setQty(i.key, i.qty - 1)} className="rounded-md border p-1"><Minus className="h-4 w-4" /></button>
                        <span className="w-6 text-center text-sm">{i.qty}</span>
                        <button aria-label="Increase" onClick={() => cart.setQty(i.key, i.qty + 1)} className="rounded-md border p-1"><Plus className="h-4 w-4" /></button>
                        <button aria-label="Remove" onClick={() => cart.setQty(i.key, 0)} className="ml-auto rounded-md p-1 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="h-fit space-y-4 rounded-2xl border bg-card p-5"
            >
              <p className="font-display text-lg font-bold">Delivery details</p>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm" />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" inputMode="tel" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm" />
              <input required value={state} onChange={(e) => setState(e.target.value)} placeholder="City / State" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm" />
              <div className="space-y-2">
                {DELIVERY.map((d) => (
                  <label key={d} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="delivery" checked={delivery === d} onChange={() => setDelivery(d)} />
                    {d}
                  </label>
                ))}
              </div>
              <WhatsAppButton className="w-full" message={msg}>Checkout via WhatsApp</WhatsAppButton>
              <button type="submit" className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                Continue checkout on site
              </button>
              <p className="text-center text-xs text-muted-foreground">Preview only — no payment is taken and no details are sent.</p>
            </form>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
