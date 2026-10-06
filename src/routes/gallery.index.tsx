import { createFileRoute } from "@tanstack/react-router";
import { getGalleryProjects } from "@/content/queries";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Gallery — Moments We've Created | Dulal Arts" },
      {
        name: "description",
        content:
          "Browse birthday setups, gift hampers, customized gifts, anniversary and event decor created by Dulal Arts.",
      },
      { property: "og:title", content: "Moments We've Created — Dulal Arts Gallery" },
      {
        property: "og:description",
        content: "Birthday setups, hampers, customized gifts and event decor from our recent work.",
      },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  loader: async () => {
    const { getGalleryProjects } = await import("@/content/sanityQueries");
    return { projects: await getGalleryProjects() };
  },
  component: GalleryPage,
});

function GalleryPage() {
  const { projects } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Moments We've Created"
        intro="Real celebrations, real gifts. Tap any image to see it larger."
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <GalleryGrid projects={projects} />
        </div>
      </section>

      <CTASection title="Want Something Like This?" />
    </>
  );
}
