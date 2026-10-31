import { Link } from "@tanstack/react-router";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BUSINESS, whatsappLink } from "@/lib/business";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/swap", label: "Swap & Sell" },
  { to: "/contact", label: "Contact" },
] as const;

export function WhatsAppButton({
  message,
  children = "Chat on WhatsApp",
  className = "",
}: {
  message?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground shadow-md transition hover:brightness-110 ${className}`}
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      {children}
    </a>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-primary font-display text-xl font-bold text-primary">
        G
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-lg font-bold text-primary">Opeyemi</span>
        <span className="block truncate text-xs font-semibold tracking-wide text-brand-maroon">
          Phone &amp; Gadgets
        </span>
      </span>
    </Link>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="bg-primary px-4 py-1.5 text-center text-xs text-primary-foreground">
        Concept demo by KELLYRAY / STUDIO — not the official business website
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                activeProps={{ className: "text-sm font-semibold text-primary" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            <WhatsAppButton className="px-4 py-2">WhatsApp</WhatsAppButton>
          </nav>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t px-4 py-3 md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 font-medium hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              New &amp; UK used gadgets. We buy, we sell, we swap. Nationwide delivery.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Contact</p>
            <p className="mt-2 text-muted-foreground">Call / WhatsApp: {BUSINESS.phoneDisplay}</p>
            <p className="text-muted-foreground">CAC: {BUSINESS.bn}</p>
          </div>
          <div className="flex flex-col gap-1.5 text-sm">
            <p className="font-semibold">Explore</p>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-primary">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BUSINESS.name} · Independent concept, not officially
          commissioned · Website Concept &amp; Design by{" "}
          <span className="font-semibold tracking-wider">KELLYRAY / STUDIO</span>
        </div>
      </footer>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg md:hidden"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
