import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { getCategoryBySlug, getProductBySlug, getRelatedProducts } from "@/content/queries";
import { messages } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/cards";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/collections/$slug/$productSlug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.productSlug);
    if (!product) throw notFound();
    const category = getCategoryBySlug(params.slug) ?? getCategoryBySlug(product.category);
    return { product, categoryName: category?.name ?? "Collection" };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable — Dulal Arts" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = product.seoTitle ?? `${product.title} — Dulal Arts`;
    const description = product.seoDescription ?? product.shortDescription;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/collections/${params.slug}/${params.productSlug}` },
      ],
      links: [{ rel: "canonical", href: `/collections/${params.slug}/${params.productSlug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description,
            brand: { "@type": "Brand", name: "Dulal Arts" },
          }),
        },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product, categoryName } = Route.useLoaderData();
  const { slug } = Route.useParams();
  const [active, setActive] = useState(0);
  const related = getRelatedProducts(product);
  const images = product.images.length > 0 ? product.images : product.featuredImage ? [product.featuredImage] : [];
  const current = images[active];

  return (
    <>
      <section className="bg-background pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Collections", to: "/collections" },
              { label: categoryName, to: "/collections/$slug", params: { slug } },
              { label: product.title },
            ]}
          />

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {current ? (
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-4/5 w-full object-cover"
                />
              ) : null}
              {images.length > 1 ? (
                <div className="mt-4 flex gap-3">
                  {images.map((image, i) => (
                    <button
                      key={image.src + i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`View image ${i + 1}`}
                      aria-current={active === i}
                      className={`h-20 w-20 overflow-hidden transition-opacity duration-500 ${
                        active === i ? "frame-gold opacity-100" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-gold">{categoryName}</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl">{product.title}</h1>
              </Reveal>
              <Reveal delay={0.12}>
                <span className="rule-gold mt-7" />
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </Reveal>

              {product.showPrice && product.price ? (
                <Reveal delay={0.2}>
                  <p className="mt-6 font-display text-2xl text-foreground">{product.price}</p>
                </Reveal>
              ) : (
                <Reveal delay={0.2}>
                  <p className="mt-6 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Pricing shared on inquiry
                  </p>
                </Reveal>
              )}

              {product.customizationAvailable ? (
                <Reveal delay={0.24}>
                  <div className="mt-9 frame-gold bg-card p-7">
                    <h2 className="text-lg">Customization Available</h2>
                    <ul className="mt-4 space-y-3">
                      {product.customizationDetails.map((detail) => (
                        <li key={detail} className="flex gap-3 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={0.3}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <WhatsAppButton
                    message={messages.product(product.title)}
                    label="Ask About This Product"
                    size="lg"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl">You May Also Like</h2>
            </Reveal>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <ProductCard key={item.slug} product={item} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection message={messages.product(product.title)} />
    </>
  );
}
