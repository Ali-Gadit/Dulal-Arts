import { createFileRoute, notFound } from "@tanstack/react-router";
import { getGalleryProjectBySlug, getGalleryProjects } from "@/content/queries";
import { messages } from "@/lib/whatsapp";
import { ImageReveal, Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/gallery/$slug")({
  loader: async ({ params }) => {
    const project = await getGalleryProjectBySlug(params.slug);
    if (!project) throw notFound();
    const allProjects = await getGalleryProjects();
    const others = allProjects.filter((p) => p.slug !== project.slug).slice(0, 6);
    return { project, others };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable — Dulal Arts" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.title} — Dulal Arts`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/gallery/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/gallery/${params.slug}` }],
    };
  },
  component: GalleryProjectPage,
});

function GalleryProjectPage() {
  const { project, others } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        eyebrow={project.occasion ?? "Project"}
        title={project.title}
        intro={project.description}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Gallery", to: "/gallery" },
          { label: project.title },
        ]}
      >
        <Reveal delay={0.26}>
          <div className="mt-10">
            <WhatsAppButton message={messages.project(project.title)} label="Create Something Similar" />
          </div>
        </Reveal>
      </PageHeader>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {project.galleryImages.map((image, i) => (
              <ImageReveal
                key={image.src + i}
                src={image.src}
                alt={image.alt}
                className={`overflow-hidden ${i === 0 ? "sm:col-span-2 aspect-16/10" : "aspect-4/3"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">More Of Our Work</h2>
          </Reveal>
          <div className="mt-10">
            <GalleryGrid projects={others} showFilters={false} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
