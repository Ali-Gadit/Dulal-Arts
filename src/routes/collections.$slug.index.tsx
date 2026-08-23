import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/content/queries";
import { messages } from "@/lib/whatsapp";
import { CategoryCard, ProductCard } from "@/components/cards";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/collections/$slug/")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection unavailable — Dulal Arts" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    const title = `${category.name} — Dulal Arts`;
    return {
      meta: [
        { title },
        { name: "description", content: category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: category.description },
        { property: "og:url", content: `/collections/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/collections/${params.slug}` }],
    };
  },
  component: CollectionDetailPage,
});

function CollectionDetailPage() {
  const { category } = Route.useLoaderData();
  const products = getProductsByCategory(category.slug);
  const others = getCategories()
    .filter((c) => c.slug !== category.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={category.name}
        intro={category.description}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Collections", to: "/collections" },
          { label: category.name },
        ]}
      >
        <Reveal delay={0.26}>
          <div className="mt-10">
            <WhatsAppButton
              message={messages.collection(category.name)}
              label="Inquire on WhatsApp"
              size="md"
            />
          </div>
        </Reveal>
      </PageHeader>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          {products.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  categorySlug={category.slug}
                  delay={i * 0.05}
                />
              ))}
            </div>
          ) : (
            <div className="frame-gold max-w-xl bg-card p-10">
              <h2 className="text-2xl">Pieces coming soon</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We're photographing new work for this collection. In the meantime, tell us what you have in
                mind and we'll design it from scratch.
              </p>
              <div className="mt-8">
                <WhatsAppButton message={messages.collection(category.name)} label="Customize With Us" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Other Collections</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c, i) => (
              <CategoryCard
                key={c.slug}
                category={c}
                itemCount={getProductsByCategory(c.slug).length}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
