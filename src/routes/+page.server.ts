import type { PageServerLoad } from "./$types";
import rawData from "../../data.json";

/**
 * SSG: bundles products at build time (cron deploy) instead of fetching
 * in the browser like the previous SPA implementation.
 *
 * During `vite build` / `prerender` this runs once per page, so the daily
 * GitHub Actions cron build keeps the shipped HTML fresh against data.json.
 * Any failure falls back to empty products and never breaks the build.
 */
export const load: PageServerLoad = async () => {
  try {
    const products = (rawData as { products?: Record<string, { desc: string; url: string; img: string; type: string }> })?.products;
    if (products && typeof products === "object") {
      return { products };
    }
    return { products: {} as Record<string, { desc: string; url: string; img: string; type: string }> };
  } catch {
    return { products: {} as Record<string, { desc: string; url: string; img: string; type: string }> };
  }
};
