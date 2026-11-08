import { createFileRoute } from "@tanstack/react-router";
import { Phone, Truck, BadgeCheck } from "lucide-react";
import { SiteLayout, WhatsAppButton } from "@/components/site/Layout";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Opeyemi Phone & Gadgets" },
      { name: "description", content: "Contact Opeyemi Phone & Gadgets with price, swap and delivery enquiries from this independent preview." },
      { property: "og:title", content: "Contact Opeyemi Phone & Gadgets" },
      { property: "og:description", content: "Call or WhatsApp 09030393902 for prices, swaps and delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl font-bold">Get in touch</h1>
        <p className="mt-2 text-muted-foreground">Contact the business for prices and device enquiries.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <a href={`tel:${BUSINESS.phoneLocal}`} className="rounded-xl border bg-card p-5 hover:border-primary">
            <Phone className="h-6 w-6 text-primary" />
            <p className="mt-2 font-semibold">Call</p>
            <p className="text-sm text-muted-foreground">{BUSINESS.phoneDisplay}</p>
          </a>
          <div className="rounded-xl border bg-card p-5">
            <Truck className="h-6 w-6 text-primary" />
            <p className="mt-2 font-semibold">Delivery</p>
            <p className="text-sm text-muted-foreground">Ask the shop to confirm coverage, costs and times.</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <BadgeCheck className="h-6 w-6 text-primary" />
            <p className="mt-2 font-semibold">Business reference</p>
            <p className="text-sm text-muted-foreground">{BUSINESS.bn} · supplied for the concept; not independently verified.</p>
          </div>
        </div>
        <WhatsAppButton className="mt-8 w-full sm:w-auto" message="Hello Opeyemi Phone & Gadgets, I'd like to make an enquiry." />
      </section>
    </SiteLayout>
  );
}
