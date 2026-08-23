import { createFileRoute } from "@tanstack/react-router";
import { getCategories, getFeaturedProducts, getProductsByCategory } from "@/content/queries";
import { CategoryCard, ProductCard } from "@/components/cards";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — Gifts, Hampers & Decor by Occasion | Dulal Arts" },
      {
        name: "description",
        content:
          "Browse Dulal Arts collections: birthday gifts, anniversary gifts, wedding gifts, customized hampers, baby gifts, corporate gifts and home decor.",
      },
      { property: "og:title", content: "Our Collections — Dulal Arts" },
      {
        property: "og:description",
        content: "Gifts, hampers and decor organised by occasion — every piece can be customized.",
      },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const categories = getCategories();
  const featured = getFeaturedProducts();

  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title="Our Collections"
        intro="Organised by occasion, made to be adapted. Choose a collection and tell us how you'd like it changed."
        crumbs={[{ label: "Home", to: "/" }, { label: "Collections" }]}
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <CategoryCard
                key={category.slug}
                category={category}
                itemCount={getProductsByCategory(category.slug).length}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Selected Pieces"
            title="Featured Creations"
            intro="A cross-section of our work. Every piece here is made to order."
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <ProductCard key={product.slug} product={product} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
