import type { MetadataRoute } from "next";
import { PROCEDIMIENTOS } from "@/data/procedimientos";
import { SITE } from "@/data/site";

/** /sitemap.xml: todas las páginas públicas. Se genera en el build. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const ahora = new Date();
  return [
    { url: `${base}/`, lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/valoracion`, lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    ...PROCEDIMIENTOS.map((p) => ({
      url: `${base}/procedimientos/${p.slug}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/privacidad`, lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
  ];
}
