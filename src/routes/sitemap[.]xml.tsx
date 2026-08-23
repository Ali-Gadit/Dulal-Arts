import { createFileRoute } from "@tanstack/react-router";
import { categories, galleryProjects, products, services } from "@/content/data";

function buildSitemap(origin: string) {
  const staticPaths = ["/", "/about", "/services", "/collections", "/gallery", "/contact"];
  const servicePaths = services.map((s) => `/services/${s.slug}`);
  const categoryPaths = categories.map((c) => `/collections/${c.slug}`);
  const productPaths = products.map((p) => `/collections/${p.category}/${p.slug}`);
  const galleryPaths = galleryProjects.map((p) => `/gallery/${p.slug}`);

  const urls = [...staticPaths, ...servicePaths, ...categoryPaths, ...productPaths, ...galleryPaths]
    .map((path) => `  <url><loc>${origin}${path}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        const forwardedHost =
          url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null;
        const origin = forwardedHost ? `https://${forwardedHost}` : url.origin;

        return new Response(buildSitemap(origin), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
