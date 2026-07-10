import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";

const PUBLIC_ROUTES = ["", "/about", "/levels", "/privacy", "/terms", "/login", "/register"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PUBLIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
