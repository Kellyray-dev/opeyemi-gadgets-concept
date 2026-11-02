import phonePro from "@/assets/products/phone-pro-titanium.jpg";
import phoneColor from "@/assets/products/phone-standard-color.jpg";
import phoneClassic from "@/assets/products/phone-pro-classic.jpg";
import phoneOlder from "@/assets/products/phone-older.jpg";
import laptopAir from "@/assets/products/laptop-air.jpg";
import laptopPro from "@/assets/products/laptop-pro.jpg";
import watchSeries from "@/assets/products/watch-series.jpg";
import watchUltra from "@/assets/products/watch-ultra.jpg";

export type Category = "iPhone" | "MacBook" | "Apple Watch";
export type Condition = "New" | "UK Used";

export interface Product {
  id: string;
  name: string;
  category: Category;
  conditions: Condition[];
  storage: string[];
  family: string;
  /** Only set when a real price is supplied by the business. */
  price: number | null;
  /** True when the model appears in the business's own inventory photo. */
  seenInInventory: boolean;
  /** Preview-only illustrative photo; replace with the shop's real photos. */
  image: string;
  /** Latest model generation — shown in "New In". Not a stock claim. */
  isNew: boolean;
}

// No prices were supplied, so every price is null ("Request Price").
// Storage options are Apple's standard configurations for each model.
const iphone = (
  id: string,
  name: string,
  family: string,
  storage: string[],
  seen = false,
): Product => ({
  image: /Pro/.test(name)
    ? /1[56]/.test(family) ? phonePro : phoneClassic
    : /1[56]/.test(family) ? phoneColor : phoneOlder,
  isNew: /1[56]/.test(family),
  id,
  name,
  category: "iPhone",
  conditions: ["New", "UK Used"],
  storage,
  family,
  price: null,
  seenInInventory: seen,
});

export const PRODUCTS: Product[] = [
  iphone("iphone-16-pro-max", "iPhone 16 Pro Max", "16 Series", ["256GB", "512GB", "1TB"]),
  iphone("iphone-16-pro", "iPhone 16 Pro", "16 Series", ["128GB", "256GB", "512GB", "1TB"]),
  iphone("iphone-16", "iPhone 16", "16 Series", ["128GB", "256GB", "512GB"]),
  iphone("iphone-15-pro-max", "iPhone 15 Pro Max", "15 Series", ["256GB", "512GB", "1TB"]),
  iphone("iphone-15", "iPhone 15", "15 Series", ["128GB", "256GB", "512GB"]),
  iphone("iphone-14-pro-max", "iPhone 14 Pro Max", "14 Series", ["128GB", "256GB", "512GB", "1TB"]),
  iphone("iphone-13-pro-max", "iPhone 13 Pro Max", "13 Series", ["128GB", "256GB", "512GB", "1TB"], true),
  iphone("iphone-13", "iPhone 13", "13 Series", ["128GB", "256GB", "512GB"], true),
  iphone("iphone-12-pro-max", "iPhone 12 Pro Max", "12 Series", ["128GB", "256GB", "512GB"], true),
  iphone("iphone-12", "iPhone 12", "12 Series", ["64GB", "128GB", "256GB"], true),
  iphone("iphone-11", "iPhone 11", "11 Series", ["64GB", "128GB", "256GB"], true),
  iphone("iphone-xr", "iPhone XR", "X Series", ["64GB", "128GB", "256GB"], true),
  {
    id: "macbook-air-m2",
    image: laptopAir,
    isNew: false,
    name: "MacBook Air (M2)",
    category: "MacBook",
    conditions: ["New", "UK Used"],
    storage: ["256GB", "512GB"],
    family: "MacBook Air",
    price: null,
    seenInInventory: false,
  },
  {
    id: "macbook-pro-14",
    image: laptopPro,
    isNew: false,
    name: 'MacBook Pro 14"',
    category: "MacBook",
    conditions: ["New", "UK Used"],
    storage: ["512GB", "1TB"],
    family: "MacBook Pro",
    price: null,
    seenInInventory: false,
  },
  {
    id: "watch-series-9",
    image: watchSeries,
    isNew: false,
    name: "Apple Watch Series 9",
    category: "Apple Watch",
    conditions: ["New", "UK Used"],
    storage: ["41mm", "45mm"],
    family: "Series",
    price: null,
    seenInInventory: false,
  },
  {
    id: "watch-ultra-2",
    image: watchUltra,
    isNew: true,
    name: "Apple Watch Ultra 2",
    category: "Apple Watch",
    conditions: ["New", "UK Used"],
    storage: ["49mm"],
    family: "Ultra",
    price: null,
    seenInInventory: false,
  },
];

export const CATEGORIES: Category[] = ["iPhone", "MacBook", "Apple Watch"];

export function filterProducts(
  list: Product[],
  opts: { category?: Category | "All"; condition?: Condition | "All"; q?: string },
): Product[] {
  const q = opts.q?.trim().toLowerCase() ?? "";
  return list.filter(
    (p) =>
      (!opts.category || opts.category === "All" || p.category === opts.category) &&
      (!opts.condition || opts.condition === "All" || p.conditions.includes(opts.condition)) &&
      (!q || p.name.toLowerCase().includes(q)),
  );
}

export const CATEGORY_INFO: Record<Category, { image: string; blurb: string }> = {
  iPhone: { image: phonePro, blurb: "XR to 16 Pro Max" },
  MacBook: { image: laptopPro, blurb: "Air & Pro" },
  "Apple Watch": { image: watchSeries, blurb: "Series & Ultra" },
};
