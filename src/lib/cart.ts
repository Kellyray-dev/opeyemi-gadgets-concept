import { useEffect, useSyncExternalStore } from "react";

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  option: string;
  condition: string;
  qty: number;
}

const STORAGE_KEY = "opeyemi-preview-cart";
let items: CartItem[] = [];
const listeners = new Set<() => void>();
const emit = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
};

export const cart = {
  add(item: Omit<CartItem, "key" | "qty">) {
    const key = `${item.productId}|${item.option}|${item.condition}`;
    const found = items.find((i) => i.key === key);
    items = found
      ? items.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      : [...items, { ...item, key, qty: 1 }];
    emit();
  },
  setQty(key: string, qty: number) {
    items = qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i));
    emit();
  },
  clear() {
    items = [];
    emit();
  },
  get: () => items,
};

let hydrated = false;
const EMPTY: CartItem[] = [];

export function useCart(): CartItem[] {
  useEffect(() => {
    if (hydrated) return;
    hydrated = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        items = JSON.parse(raw);
        listeners.forEach((l) => l());
      }
    } catch {
      /* ignore */
    }
  }, []);
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => items,
    () => EMPTY,
  );
}

/** WhatsApp order message. Prices are never included — the shop confirms them. */
export function orderMessage(list: CartItem[], customer?: { name?: string | undefined; state?: string | undefined; delivery?: string | undefined }): string {
  const lines = list.map((i, n) => `${n + 1}. ${i.name} — ${i.option}, ${i.condition} × ${i.qty}`);
  const extra = [
    customer?.name && `Name: ${customer.name}`,
    customer?.state && `Location: ${customer.state}`,
    customer?.delivery && `Delivery: ${customer.delivery}`,
  ].filter(Boolean);
  return [
    "Hello Opeyemi Phone & Gadgets, I'd like to order:",
    ...lines,
    ...(extra.length ? ["", ...extra] : []),
    "",
    "Please confirm availability, battery health and price.",
  ].join("\n");
}
