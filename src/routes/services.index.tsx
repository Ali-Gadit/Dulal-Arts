import { createFileRoute } from "@tanstack/react-router";
import { getServices } from "@/content/queries";
import { ServiceCard } from "@/components/cards";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Customized Gifts, Hampers & Decor | Dulal Arts" },
      {
        name: "description",
        content:
          "Customized gifts, gift hampers, event and party decor, birthday setups, personalized decor and corporate gifting by Dulal Arts.",
      },
      { property: "og:title", content: "What We Create — Dulal Arts Services" },
      {
        property: "og:description",
        content:
          "Customized gifts, curated hampers, birthday setups, event decor and corporate gifting, designed around your idea.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = getServices();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What We Create"
        intro="Every service below is a starting point. Tell us the occasion and we'll shape it around your idea."
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <ul>
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
