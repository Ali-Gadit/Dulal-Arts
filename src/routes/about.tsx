import { createFileRoute } from "@tanstack/react-router";
import {
  featuredProjectImage,
  siteSettings,
  storyImage as fallbackStoryImage,
  whyPoints,
} from "@/content/data";
import { ImageReveal, Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import serviceCustomGifts from "@/assets/service-custom-gifts.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Art Behind Every Thoughtful Gift | Dulal Arts" },
      {
        name: "description",
        content:
          "Dulal Arts is a gifting and decoration studio built on craftsmanship, personalization and thoughtful design. Read our story and creative philosophy.",
      },
      { property: "og:title", content: "The Art Behind Every Thoughtful Gift — Dulal Arts" },
      {
        property: "og:description",
        content:
          "A gifting and decoration studio built on craftsmanship, personalization and thoughtful design.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  loader: async () => {
    const { getHomePageData } = await import("@/content/sanityQueries");
    const homeData = await getHomePageData();
    return { homeData };
  },
  component: AboutPage,
});

const philosophy = [
  {
    title: "The Idea Comes First",
    body: "We start with a conversation, not a catalogue. Who is it for, what are you celebrating, and what should they feel when they open it?",
  },
  {
    title: "Made By Hand",
    body: "Wrapping, engraving, arranging and styling are done by hand, because the details are what people remember.",
  },
  {
    title: "Finished With Care",
    body: "Presentation is part of the gift. Colour, texture, ribbon and packaging are chosen to work as one piece.",
  },
];

function AboutPage() {
  const { homeData } = Route.useLoaderData();
  const currentStoryImage = homeData?.storyImage?.src ? homeData.storyImage : fallbackStoryImage;

  return (
    <>
      <PageHeader
        eyebrow="About Dulal Arts"
        title="The Art Behind Every Thoughtful Gift"
        intro={`${siteSettings.brandName} designs and makes customized gifts, curated hampers and celebration decor — pieces built around one person, one occasion and one idea.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-[86rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Our Story ❤️"
              intro="DulalArts — Where every idea is as unique as you are."
            >
              <Reveal delay={0.22}>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                  DulalArts began with a creative girl, a head full of dreams, and one person who truly believed in her.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                  Before DulalArts, I tried many names, including Handmade D. But when I met the person who supported my creativity and believed in my dream, the name finally found its meaning: Dua + &ldquo;lal&rdquo; from his name = DulalArts.
                </p>
              </Reveal>
              <Reveal delay={0.34}>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                  We believe love and appreciation shouldn't wait for a special occasion. A handmade gift, a thoughtful note, or a little surprise can tell someone, &ldquo;You matter to me.&rdquo;
                </p>
              </Reveal>
              <Reveal delay={0.40}>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                  Our dream is bigger than gifts &amp; Decor. One day, we hope to grow into DulalArts Mart, a home for Pakistani artists, their creations, and the stories behind them. 🇵🇰❤️
                  </p>
              </Reveal>
              <Reveal delay={0.46}>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground font-medium">
                  DulalArts — Where every idea is as unique as you are.
                  <br />
                  Customize your khushiyan with us
                </p>
              </Reveal>
            </SectionHeading>
          </div>
          <ImageReveal
            src={currentStoryImage.src}
            alt={currentStoryImage.alt}
            className="aspect-4/5 overflow-hidden"
            width={1200}
            height={1504}
          />
        </div>
      </section>

      <section className="border-y border-border bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Mission"
            title="This Isn't Just A Gift. It's A Moment Someone Remembers."
            align="center"
            intro="Our work exists to make the people you care about feel seen. Everything we design is measured against that."
          />
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {philosophy.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07} className="frame-gold bg-card p-8 lg:p-10">
                <span className="font-display text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How We Work"
              title="From First Idea To Finished Piece"
              intro="A simple process, kept transparent from start to finish."
            />
          </div>
          <ol className="lg:col-span-7">
            {[
              {
                step: "Tell us the idea",
                body: "Share the occasion, the person and any references you love.",
              },
              {
                step: "We design it",
                body: "We propose a concept, palette, materials and personalization options.",
              },
              {
                step: "You approve",
                body: "Adjust anything — wording, colours, contents or scale.",
              },
              {
                step: "We make and deliver",
                body: "Handmade, wrapped and presented, ready for the moment.",
              },
            ].map((item, i) => (
              <Reveal
                as="li"
                key={item.step}
                delay={i * 0.06}
                className="border-t border-border py-7"
              >
                <div className="flex gap-6">
                  <span className="font-display text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl">{item.step}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading
            eyebrow="What Makes Us Different"
            title="Why Choose Dulal Arts?"
            align="center"
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {whyPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06}>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full frame-gold font-display text-sm text-gold"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-[86rem] gap-4 px-5 sm:grid-cols-2 sm:px-8">
          <ImageReveal
            src={serviceCustomGifts}
            alt="Engraved keepsake box with monogrammed cards and dried roses"
            className="aspect-4/3 overflow-hidden"
            width={1200}
            height={1504}
          />
          <ImageReveal
            src={featuredProjectImage.src}
            alt={featuredProjectImage.alt}
            className="aspect-4/3 overflow-hidden"
            width={1600}
            height={1200}
          />
        </div>
      </section>

      <CTASection title="Let's Make Something Personal" />
    </>
  );
}






