import type { MetadataRoute } from "next";

const BASE_URL = "https://thecurryleaf.ug";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/bar", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/breakfast", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/reservations", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/experiences", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/film-festival", priority: 0.5, changeFrequency: "weekly" as const },
  { path: "/book-clubs", priority: 0.5, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
