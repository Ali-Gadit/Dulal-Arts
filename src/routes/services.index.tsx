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
  loader: async () => {
    return { services: await getServices() };
  },
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = Route.useLoaderData();

  const grouped = services.reduce((acc, service) => {
    const cat = service.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  const groupOrder = [
    "DIY kits",
    "Pretty Little Decor",
    "Gifts",
    "Wrapping & Packaging Services",
    "Other"
  ];

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What We Create"
        intro="Every service below is a starting point. Tell us the occasion and we'll shape it around your idea."
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          
          {/* Sub-navigation jump links */}
          <div className="mb-16 flex flex-wrap items-center gap-3">
            {groupOrder.map((group) => {
              if (!grouped[group] || grouped[group].length === 0) return null;
              const groupId = group.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <a 
                  key={group} 
                  href={`#${groupId}`}
                  className="rounded-full border border-gold/30 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold/10 hover:text-primary"
                >
                  {group}
                </a>
              );
            })}
          </div>

          {groupOrder.map((group) => {
            const groupServices = grouped[group];
            if (!groupServices || groupServices.length === 0) return null;
            const groupId = group.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <div key={group} id={groupId} className="mb-24 scroll-mt-32 last:mb-0">
                <div className="mb-12 border-b border-gold/30 pb-4">
                  <h2 className="font-display text-4xl text-primary">{group}</h2>
                </div>
                <ul>
                  {groupServices.map((service, i) => (
                    <ServiceCard key={service.slug} service={service} index={i} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
