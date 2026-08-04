import type { MetadataRoute } from "next";

// Required for `output: 'export'` — without this, `next build` fails to
// statically prerender /robots.txt.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/php/"],
    },
    sitemap: "https://rbixtechnologies.com/sitemap.xml",
  };
}
