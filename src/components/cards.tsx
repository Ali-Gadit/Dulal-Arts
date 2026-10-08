import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Category, Product, Service } from "@/content/types";
import { Reveal } from "./Reveal";
import { whatsappLink, messages } from "@/lib/whatsapp";

/** Editorial service row: number, image, title, description, explore link. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const flip = index % 2 === 1;

  return (
    <Reveal as="li" className="group border-t border-border py-10 first:border-t-0 lg:py-14">
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="grid items-center gap-7 lg:grid-cols-12 lg:gap-12"
      >
        <div
          className={`hover-zoom-media aspect-4/3 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
        >
          {service.image ? (
            <img
              src={service.image.src}
              alt={service.image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-secondary" />
          )}
        </div>

        <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
          <span className="font-display text-sm text-gold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-2xl leading-tight sm:text-3xl">{service.title}</h3>
          <span className="rule-gold mt-5 transition-all duration-700 group-hover:w-28" />
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>
          {service.price ? (
              <p className="mt-3 text-[1.1rem] font-medium text-foreground">Rs. {service.price}</p>
            ) : (
              <p className="mt-3 text-[0.95rem] font-medium text-foreground">
                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(whatsappLink(messages.service(service.title)) || "/contact", "_blank"); }} className="underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors cursor-pointer">
                  Contact us for price
                </span>
              </p>
            )}
          <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">
            Explore
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function CategoryCard({
  category,
  itemCount,
  delay = 0,
}: {
  category: Category;
  itemCount: number;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="group">
      <Link to="/collections/$slug" params={{ slug: category.slug }} className="block">
        <div className="hover-zoom-media relative aspect-3/4">
          {category.coverImage ? (
            <img
              src={category.coverImage.src}
              alt={category.coverImage.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-secondary" />
          )}
          <span className="pointer-events-none absolute inset-3 frame-gold opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>
        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl">{category.name}</h3>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
            Explore
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ProductCard({
  product,
  categorySlug,
  delay = 0,
}: {
  product: Product;
  categorySlug?: string;
  delay?: number;
}) {
  const slug = categorySlug ?? product.category;

  return (
    <Reveal delay={delay} className="group">
      <Link
        to="/collections/$slug/$productSlug"
        params={{ slug, productSlug: product.slug }}
        className="block"
      >
        <div className="hover-zoom-media aspect-square bg-secondary">
          {product.featuredImage ? (
            <img
              src={product.featuredImage.src}
              alt={product.featuredImage.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="mt-4">
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">
            {product.category.replace(/-/g, " ")}
          </p>
          <h3 className="mt-2 text-lg leading-snug">{product.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
          {product.price ? (
            <p className="mt-3 text-sm text-foreground">Rs. {product.price}</p>
          ) : (
            <p className="mt-3 text-sm text-foreground">
              <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(whatsappLink(messages.product(product.title)) || "/contact", "_blank"); }} className="underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors cursor-pointer">
                Contact us for price
              </span>
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
            View Details
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}



