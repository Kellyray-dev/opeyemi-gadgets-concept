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

import { orderMessage } from "@/lib/cart";
describe("checkout rules", () => {
  it("WhatsApp order message never includes a Naira price", () => {
    const m = orderMessage([{ key: "k", productId: "iphone-13", name: "iPhone 13", option: "128GB", condition: "UK Used", qty: 2 }]);
    expect(m).toContain("iPhone 13 — 128GB, UK Used × 2");
    expect(m).not.toContain("₦");
  });
});
