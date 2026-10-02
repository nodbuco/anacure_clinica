import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/** /robots.txt: todo el sitio es público. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
