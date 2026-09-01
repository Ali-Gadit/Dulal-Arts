import { createFileRoute, notFound } from "@tanstack/react-router";
import { getServiceBySlug, getServices } from "@/content/queries";
import { messages } from "@/lib/whatsapp";
import { ImageReveal, Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { ServiceCard } from "@/components/cards";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const service = await getServiceBySlug(params.slug);
    if (!service) throw notFound();
    const allServices = await getServices();
    
    return { service, allServices };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable — Dulal Arts" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    const title = `${service.title} — Dulal Arts`;
    return {
      meta: [
        { title },
        { name: "description", content: service.shortDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: service.shortDescription },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service, allServices } = Route.useLoaderData();
  const others = allServices
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        intro={service.shortDescription}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-[86rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          {service.image ? (
            <ImageReveal
              src={service.image.src}
              alt={service.image.alt}
              className="aspect-4/3 overflow-hidden lg:col-span-7"
              width={1600}
              height={1200}
            />
          ) : null}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-primary">The Approach</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-6 font-display text-2xl leading-snug text-foreground">{service.description}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <span className="rule-gold mt-8" />
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-3">
                <WhatsAppButton
                  message={messages.service(service.title)}
                  label="Inquire on WhatsApp"
                  size="lg"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">More Of What We Create</h2>
          </Reveal>
          <ul className="mt-10">
            {others.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
