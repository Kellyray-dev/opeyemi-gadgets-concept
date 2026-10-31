import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, Banknote, Repeat } from "lucide-react";
import { useState } from "react";
import { SiteLayout, WhatsAppButton } from "@/components/site/Layout";

export const Route = createFileRoute("/swap")({
  head: () => ({
    meta: [
      { title: "Swap or Sell Your Phone — Opeyemi Phone & Gadgets" },
      { name: "description", content: "Sell your phone for cash or swap it towards an upgrade. Get a quote on WhatsApp." },
      { property: "og:title", content: "Swap or Sell Your Phone — Opeyemi Phone & Gadgets" },
      { property: "og:description", content: "We buy, we sell, we swap. Start your enquiry on WhatsApp." },
    ],
  }),
  component: Swap,
});

const MODES = [
  { id: "Swap", icon: Repeat, title: "Swap my phone", text: "Trade in towards an upgrade" },
  { id: "Sell", icon: Banknote, title: "Sell my phone", text: "Get cash for your device" },
  { id: "Buy", icon: ShoppingCart, title: "Buy a phone", text: "Find your next device" },
] as const;

const field = "w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary";

function Swap() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("Swap");
  const [current, setCurrent] = useState("");
  const [storage, setStorage] = useState("");
  const [battery, setBattery] = useState("");
  const [faults, setFaults] = useState("");
  const [wanted, setWanted] = useState("");

  const lines = [
    `Hello Opeyemi Phone & Gadgets, I want to ${mode.toLowerCase()} a phone.`,
    mode !== "Buy" && current && `My phone: ${current}${storage ? ` (${storage})` : ""}`,
    mode !== "Buy" && battery && `Battery health: ${battery}%`,
    mode !== "Buy" && faults && `Condition/faults: ${faults}`,
    mode !== "Sell" && wanted && `I want: ${wanted}`,
  ].filter(Boolean);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">We Buy, We Sell, We Swap</h1>
        <p className="mt-2 text-muted-foreground">
          Tell us about your device. We'll put your details into a WhatsApp message — nothing is
          sent or stored until you choose to send it yourself.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-xl border p-4 text-left transition ${mode === m.id ? "border-primary bg-accent" : "bg-card hover:border-primary"}`}
            >
              <m.icon className="h-6 w-6 text-primary" />
              <p className="mt-2 font-semibold">{m.title}</p>
              <p className="text-xs text-muted-foreground">{m.text}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4 rounded-2xl border bg-card p-5">
          {mode !== "Buy" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">Your phone model
                  <input className={`${field} mt-1`} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="e.g. iPhone 12 Pro" />
                </label>
                <label className="text-sm font-medium">Storage
                  <input className={`${field} mt-1`} value={storage} onChange={(e) => setStorage(e.target.value)} placeholder="e.g. 128GB" />
                </label>
              </div>
              <label className="block text-sm font-medium">Battery health (%)
                <input type="number" min={0} max={100} className={`${field} mt-1`} value={battery} onChange={(e) => setBattery(e.target.value)} placeholder="Settings → Battery" />
              </label>
              <label className="block text-sm font-medium">Condition / any faults
                <textarea className={`${field} mt-1`} rows={3} value={faults} onChange={(e) => setFaults(e.target.value)} placeholder="Scratches, Face ID, screen replaced…" />
              </label>
            </>
          )}
          {mode !== "Sell" && (
            <label className="block text-sm font-medium">Phone you want
              <input className={`${field} mt-1`} value={wanted} onChange={(e) => setWanted(e.target.value)} placeholder="e.g. iPhone 15 Pro Max 256GB" />
            </label>
          )}
          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground whitespace-pre-line">
            {lines.join("\n")}
          </div>
          <WhatsAppButton className="w-full" message={lines.join("\n")}>
            Open in WhatsApp
          </WhatsAppButton>
          <p className="text-center text-xs text-muted-foreground">
            Swap and buy-back values are quoted by the shop after inspection.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
