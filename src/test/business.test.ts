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
