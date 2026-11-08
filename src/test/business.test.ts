import { describe, expect, it } from "vitest";
import { formatNaira, whatsappLink } from "@/lib/business";
import { PRODUCTS } from "@/lib/catalog";

describe("business rules", () => {
  it("WhatsApp links use the verified number 09030393902", () => {
    expect(whatsappLink()).toBe("https://wa.me/2349030393902");
  });
  it("formats Naira amounts with ₦ and thousands separators", () => {
    expect(formatNaira(450000)).toBe("₦450,000");
  });
  it("shows Request Price when no verified price exists", () => {
    expect(formatNaira(null)).toBe("Request Price");
  });
  it("no product carries an invented price", () => {
    expect(PRODUCTS.every((p) => p.price === null)).toBe(true);
  });
});

import { cart, orderMessage, parseStoredCart } from "@/lib/cart";
import { filterProducts } from "@/lib/catalog";
describe("checkout rules", () => {
  it("WhatsApp order message never includes a Naira price", () => {
    const m = orderMessage([{ key: "k", productId: "iphone-13", name: "iPhone 13", option: "128GB", condition: "UK Used", qty: 2 }]);
    expect(m).toContain("iPhone 13 — 128GB, UK Used × 2");
    expect(m).not.toContain("₦");
  });
  it("includes the phone and requested delivery preference in an enquiry", () => {
    const m = orderMessage([], { name: "Demo Guest", phone: "08000000000", state: "Lagos", delivery: "Ask about delivery" });
    expect(m).toContain("Phone: 08000000000");
    expect(m).toContain("Location: Lagos");
    expect(m).toContain("Delivery preference (please confirm): Ask about delivery");
  });
  it("keeps distinct storage and condition requests separate and updates quantities", () => {
    cart.clear();
    const item = { productId: "iphone-13", name: "iPhone 13", option: "128GB", condition: "UK Used" };
    cart.add(item);
    cart.add(item);
    cart.add({ ...item, option: "256GB" });
    cart.add({ ...item, condition: "New" });
    expect(cart.get().map((i) => i.qty)).toEqual([2, 1, 1]);
    const first = cart.get()[0];
    if (!first) throw new Error("Missing cart item");
    cart.setQty(first.key, 3);
    expect(cart.get()[0]?.qty).toBe(3);
    cart.setQty(first.key, 0);
    expect(cart.get()).toHaveLength(2);
    cart.clear();
  });
  it("ignores corrupted stored basket values", () => {
    expect(parseStoredCart('{"qty":2}')).toEqual([]);
    expect(parseStoredCart('[null,{"qty":-1}]')).toEqual([]);
    expect(parseStoredCart('broken')).toEqual([]);
  });
  it("combines category, condition and case-insensitive model search", () => {
    expect(filterProducts(PRODUCTS, { category: "iPhone", condition: "UK Used", q: " 13 PRO MAX " }).map((p) => p.id)).toEqual(["iphone-13-pro-max"]);
    expect(filterProducts(PRODUCTS, { category: "MacBook", q: "iPhone" })).toEqual([]);
    expect(filterProducts(PRODUCTS, { category: "Apple Watch" })).toHaveLength(2);
  });
});
