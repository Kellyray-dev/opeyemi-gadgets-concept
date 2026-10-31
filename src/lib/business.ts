export const BUSINESS = {
  name: "Opeyemi Phone & Gadgets",
  bn: "BN 7710639",
  phoneDisplay: "0903 039 3902",
  phoneLocal: "09030393902",
  tagline: "Get Quality Gadgets At Best Price",
};

/** Convert a Nigerian local number (0XXXXXXXXXX) to international digits for wa.me links. */
export function toInternational(local: string): string {
  const digits = local.replace(/\D/g, "");
  return digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
}

/** Build a wa.me link. Opens only when the visitor taps it — nothing is sent automatically. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${toInternational(BUSINESS.phoneLocal)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Format a Naira amount; null means no verified price exists. */
export function formatNaira(amount: number | null): string {
  if (amount == null) return "Request Price";
  return "₦" + Math.round(amount).toLocaleString("en-NG");
}
