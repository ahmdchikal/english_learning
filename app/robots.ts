import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/dashboard", "/lesson", "/quiz", "/practice", "/profile", "/settings"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
