import { Link } from "@tanstack/react-router";
import { MessageCircle, Menu, ShoppingBag } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useCart } from "@/lib/cart";

function CartLink() {
  const count = useCart().reduce((n, i) => n + i.qty, 0);
  return (
    <Link to="/checkout" aria-label={`Your order (${count} items)`} className="relative grid min-h-11 min-w-11 place-items-center rounded-md text-primary">
      <ShoppingBag className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-maroon px-1 text-[10px] font-bold text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

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
    <Button asChild className={`h-auto min-h-11 whitespace-normal bg-whatsapp px-4 py-3 text-whatsapp-foreground hover:bg-whatsapp/90 ${className}`}>
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      {children}
    </a>
    </Button>
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
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-background focus:p-3 focus:text-primary">Skip to content</a>
      <div className="bg-primary px-4 py-2 text-center text-xs leading-relaxed text-primary-foreground">
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
            <CartLink />
          </nav>
          <div className="flex items-center gap-1 md:hidden">
          <CartLink />
           <Sheet open={open} onOpenChange={setOpen}>
             <SheetTrigger asChild><Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Open menu"><Menu /></Button></SheetTrigger>
             <SheetContent className="w-[min(88vw,360px)] overflow-y-auto pt-16">
               <SheetTitle className="font-display text-2xl">Opeyemi</SheetTitle>
               <SheetDescription>Phone &amp; Gadgets · Independent concept</SheetDescription>
               <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-2">
                 {NAV.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 font-semibold hover:bg-accent" activeOptions={{ exact: true }} activeProps={{ className: "bg-accent text-primary" }}>{n.label}</Link>)}
                 <Link to="/checkout" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 font-semibold hover:bg-accent">Your order</Link>
               </nav>
               <WhatsAppButton className="mt-8 w-full" />
             </SheetContent>
           </Sheet>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">{children}</main>
      <footer className="border-t bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              iPhones &amp; gadgets. Buy, sell and swap enquiries. All devices shown are concept examples, not confirmed stock.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Contact</p>
            <p className="mt-2 text-muted-foreground">Call / WhatsApp: {BUSINESS.phoneDisplay}</p>
             <p className="text-muted-foreground">Business-supplied reference: {BUSINESS.bn} (not independently verified)</p>
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
        <div className="border-t px-4 pb-24 pt-4 text-center text-xs md:pb-4 text-muted-foreground">
          © {new Date().getFullYear()} {BUSINESS.name} · Independent concept, not officially
          commissioned · Website Concept &amp; Design by{" "}
          <span className="font-semibold tracking-wider">KELLYRAY / STUDIO</span>
        </div>
      </footer>
    </div>
  );
}
