import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, CheckCircle2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteLayout, WhatsAppButton } from "@/components/site/Layout";
import { PRODUCTS } from "@/lib/catalog";
import { cart, orderMessage, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Your Order — Opeyemi Phone & Gadgets" },
      { name: "description", content: "Review concept device selections, prepare a WhatsApp enquiry or try the simulated checkout. No orders or payments are processed." },
      { property: "og:title", content: "Your Order — Opeyemi Phone & Gadgets" },
      { property: "og:description", content: "Demonstration checkout only. Prepare an enquiry; no order is placed or payment taken." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

const DELIVERY: string[] = ["Ask about delivery", "Ask about collection"];

function Checkout() {
  const items = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [delivery, setDelivery] = useState<string>(DELIVERY[0] ?? "");
  const [done, setDone] = useState(false);
  const msg = orderMessage(items, { name, phone, state, delivery });

  if (done) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-whatsapp" />
          <h1 className="mt-4 font-display text-3xl font-bold">Demonstration complete</h1>
          <p className="mt-3 text-muted-foreground">
            On the live site, the shop would receive this request and contact you to confirm price,
            availability and delivery. This is a design preview — nothing was sent or charged.
          </p>
          <pre className="mt-5 whitespace-pre-wrap break-words rounded-lg bg-muted p-4 text-left font-sans text-sm">{msg}</pre>
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
        <p className="mt-2 text-muted-foreground">Demonstration only — no order is placed and no payment is taken.</p>

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
                  <li key={i.key} className="flex gap-3 rounded-lg border bg-card p-3">
                    {p && <img src={p.image} alt={i.name} loading="lazy" decoding="async" width={816} height={816} className="h-16 w-16 shrink-0 rounded-md object-contain sm:h-20 sm:w-20" />}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{i.name}</p>
                      <p className="text-sm text-muted-foreground">{i.option} · {i.condition}</p>
                      <p className="text-sm font-semibold text-primary">Request Price</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button variant="outline" size="icon" aria-label={`Decrease ${i.name} quantity`} onClick={() => cart.setQty(i.key, i.qty - 1)} className="min-h-11 min-w-11"><Minus /></Button>
                        <span aria-label="Quantity" className="min-w-6 text-center text-sm">{i.qty}</span>
                        <Button variant="outline" size="icon" aria-label={`Increase ${i.name} quantity`} onClick={() => cart.setQty(i.key, i.qty + 1)} className="min-h-11 min-w-11"><Plus /></Button>
                        <Button variant="ghost" size="icon" aria-label={`Remove ${i.name}`} onClick={() => cart.setQty(i.key, 0)} className="ml-auto min-h-11 min-w-11 text-muted-foreground hover:text-destructive"><Trash2 /></Button>
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
              className="h-fit min-w-0 space-y-4 rounded-lg border bg-card p-5"
            >
              <p className="font-display text-lg font-bold">Enquiry details</p>
              <p className="text-sm text-muted-foreground">Use sample details to try this demo. WhatsApp opens a draft only; you decide whether to send it.</p>
              <label className="block text-sm font-medium">Full name<input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5" /></label>
              <label className="block text-sm font-medium">Phone number<input required type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5" /></label>
              <label className="block text-sm font-medium">City / State<input required value={state} onChange={(e) => setState(e.target.value)} placeholder="City / State" className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5" /></label>
              <fieldset className="space-y-2">
                <legend className="mb-2 text-sm font-medium">Preference — subject to confirmation</legend>
                {DELIVERY.map((d) => (
                  <label key={d} className="flex min-h-11 items-center gap-2 text-sm">
                    <input type="radio" name="delivery" checked={delivery === d} onChange={() => setDelivery(d)} />
                    {d}
                  </label>
                ))}
              </fieldset>
              <WhatsAppButton className="w-full" message={msg}>Checkout via WhatsApp</WhatsAppButton>
              <Button type="submit" className="min-h-12 w-full whitespace-normal">Try on-site checkout demo</Button>
              <p className="text-center text-xs text-muted-foreground">Preview only — no payment is taken and no details are sent.</p>
            </form>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
