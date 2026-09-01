import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Instagram, Star, ChevronLeft, ChevronRight } from "lucide-react";
import {
  featuredProjectImage,
  heroImage,
  instagramFeed,
  siteSettings,
  storyImage,
  whyPoints,
} from "@/content/data";
import {
  getFeaturedCategories,
  getFeaturedGalleryProject,
  getFeaturedProducts,
  getFeaturedServices,
  getGalleryProjects,
} from "@/content/queries";
import { messages } from "@/lib/whatsapp";
import { AnimatedText, ImageReveal, Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ActionButton, WhatsAppButton } from "@/components/WhatsAppButton";
import { CategoryCard, ProductCard, ServiceCard } from "@/components/cards";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dulal Arts — Customized Gifts, Hampers & Event Decor" },
      {
        name: "description",
        content:
          "Thoughtfully crafted gifts, customized creations and beautiful decor designed to make every occasion unforgettable. Explore our work and customize with us.",
      },
      { property: "og:title", content: "Dulal Arts — Customized Gifts, Hampers & Event Decor" },
      {
        property: "og:description",
        content:
          "Thoughtfully crafted gifts, customized creations and beautiful decor for birthdays, weddings and celebrations.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async () => {
    // Dynamically importing from queries to avoid loading all data upfront if not needed,
    // but the functions are already imported at the top, so we can just use them.
    const { getProducts, getTestimonials } = await import('@/content/queries');
    const [services, categories, products, projects, feature, allProducts, testimonials] = await Promise.all([
      getFeaturedServices(),
      getFeaturedCategories(),
      getFeaturedProducts(),
      getGalleryProjects(),
      getFeaturedGalleryProject(),
      getProducts(),
      getTestimonials()
    ]);
    return { services, categories: categories.slice(0, 6), products: products.slice(0, 6), projects: projects.slice(0, 6), feature, allProducts, testimonials };
  },
  component: HomePage,
});

function HomePage() {
  const { services, categories, products, projects, feature, allProducts, testimonials } = Route.useLoaderData();
  const getProductsByCategory = (slug: string) => allProducts.filter(p => p.category === slug);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero />

      {/* Brand introduction */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-[86rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <ImageReveal
            src={storyImage.src}
            alt={storyImage.alt}
            className="aspect-4/5 overflow-hidden"
            width={1200}
            height={1504}
          />
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Made To Make Moments Special"
              intro="Dulal Arts brings together creativity, craftsmanship and thoughtful design to create gifts and decor that feel personal, memorable and beautifully made."
            >
              <Reveal delay={0.22}>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
                  Every piece begins with a conversation — about the person, the occasion and the feeling you
                  want them to have when they open it.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <Link
                  to="/about"
                  className="group mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary"
                >
                  Discover Our Story
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            </SectionHeading>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Services"
            title="What We Create"
            intro="From a single personalized gift to a fully styled celebration, each brief is approached as its own idea."
          />
          <ul className="mt-14 lg:mt-20">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </ul>
          <Reveal delay={0.1}>
            <div className="mt-14">
              <ActionButton to="/services" variant="outline" size="md">
                All Services
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>



      {/* Gallery preview */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title="Moments We've Created"
            intro="Setups, gifts and hampers we've made for real celebrations."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.05} className="group">
                <Link to="/gallery/$slug" params={{ slug: project.slug }} className="block">
                  <div className="hover-zoom-media aspect-4/5">
                    <img
                      src={project.coverImage.src}
                      alt={project.coverImage.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-lg leading-snug">{project.title}</h3>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-gold">
                    {project.occasion ?? project.category}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-14">
              <ActionButton to="/gallery" variant="outline" size="md">
                View Full Gallery
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured project */}
      {feature ? (
        <section className="bg-ink py-24 text-ink-foreground lg:py-32">
          <div className="mx-auto grid max-w-[86rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
            <ImageReveal
              src={feature.coverImage.src}
              alt={feature.coverImage.alt}
              className="aspect-4/3 overflow-hidden lg:col-span-7"
              width={1600}
              height={1200}
            />
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-gold">Featured Project</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">{feature.title}</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <span className="rule-gold mt-7" />
              </Reveal>
              {feature.occasion ? (
                <Reveal delay={0.16}>
                  <p className="mt-6 text-[0.62rem] uppercase tracking-[0.22em] text-gold">{feature.occasion}</p>
                </Reveal>
              ) : null}
              <Reveal delay={0.2}>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-foreground/70">
                  {feature.description}
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="mt-9">
                  <ActionButton to="/gallery" variant="ghost" size="md">
                    View Project
                  </ActionButton>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* Why Dulal Arts */}
        <section className="border-b border-border bg-cream py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-[86rem]">
            <div className="px-5 sm:px-8">
              <SectionHeading eyebrow="WHY CHOOSE US?" title="Because We Care Your Emotions ❤️" align="center" />
            </div>

            <div className="relative mt-12 w-full md:mt-16">
              <button
                onClick={() => scroll("left")}
                className="absolute left-1 sm:left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full frame-gold bg-cream text-gold shadow-xl md:hidden"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 pb-8 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[...whyPoints, ...whyPoints, ...whyPoints].map((point, i) => (
                  <Reveal key={`${point.title}-${i}`} delay={(i % 4) * 0.06} className={`h-full frame-gold bg-card p-8 rounded-sm w-[85vw] sm:w-[45vw] max-w-full snap-center shrink-0 md:w-auto md:shrink flex flex-col items-center text-center ${i >= whyPoints.length ? "md:hidden" : ""}`}>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full frame-gold bg-cream font-display text-sm text-gold shrink-0"
                    >
                      {String((i % whyPoints.length) + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 text-xl">{point.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{point.description}</p>
                  </Reveal>
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                className="absolute right-1 sm:right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full frame-gold bg-cream text-gold shadow-xl md:hidden"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

      {/* Testimonials — hidden until real reviews exist */}
      {testimonials.length > 0 ? (
        <section className="bg-background py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-[86rem]">
            <div className="px-5 sm:px-8">
              <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" align="center" />
            </div>

            <div className="relative mt-12 w-full md:mt-16">
              <button
                onClick={() => {
                  const el = document.getElementById("test-scroll");
                  if (el) el.scrollBy({ left: -window.innerWidth * 0.8, behavior: "smooth" });
                }}
                className="absolute left-1 sm:left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full frame-gold bg-cream text-gold shadow-xl md:hidden"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div id="test-scroll" className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 pb-8 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                  <Reveal key={`${t.customerName}-${i}`} delay={(i % 3) * 0.06} className={`h-full frame-gold bg-card p-8 rounded-sm w-[85vw] sm:w-[45vw] max-w-full snap-center shrink-0 md:w-auto md:shrink flex flex-col items-center text-center ${i >= testimonials.length ? "md:hidden" : ""}`}>
                    <div className="flex items-center gap-1 mb-4 text-gold shrink-0">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${idx < t.stars ? "fill-gold" : "fill-transparent border-gold"}`}
                        />
                      ))}
                    </div>
                    <blockquote className="mt-2 text-[0.95rem] leading-relaxed text-foreground">
                      "{t.review}"
                    </blockquote>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground">{t.customerName}</p>
                  </Reveal>
                ))}
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("test-scroll");
                  if (el) el.scrollBy({ left: window.innerWidth * 0.8, behavior: "smooth" });
                }}
                className="absolute right-1 sm:right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full frame-gold bg-cream text-gold shadow-xl md:hidden"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />

      {/* Instagram */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading eyebrow="@dulal.arts" title="Follow Our Creations" align="center" />
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {instagramFeed.map((image, i) => (
              <Reveal key={image.src + i} delay={i * 0.04} className="hover-zoom-media aspect-square">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
          {siteSettings.instagramUrl ? (
            <Reveal delay={0.1}>
              <div className="mt-12 flex justify-center">
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-sm frame-gold px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-secondary"
                >
                  <Instagram className="h-4 w-4 text-gold" aria-hidden="true" />
                  Follow Us on Instagram
                </a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-cream py-20 lg:py-24">
        <div className="mx-auto flex max-w-[86rem] flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="max-w-xl text-3xl leading-tight sm:text-4xl">
              Have an idea? Let's create it together.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton message={messages.general} label="Customize With Us" size="lg" />
              <ActionButton to="/contact" variant="outline" size="lg">
                Contact Us
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink pb-16 pt-32 lg:min-h-screen lg:pb-24">
      <motion.img
        src={heroImage.src}
        alt={heroImage.alt}
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: reduce ? 1 : 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "linear" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
      <GoldParticles />

      {/* Marquee */}
      <div className="absolute inset-x-0 top-[4.8rem] z-10 flex overflow-hidden whitespace-nowrap border-y border-gold/15 bg-ink/40 py-2.5 backdrop-blur-sm lg:top-[5.4rem]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex items-center"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 text-[0.7rem] uppercase tracking-[0.25em] text-gold/80 sm:mx-10 sm:text-[0.8rem]">
              Customize your <span className="font-sans font-medium">خوشیاں</span> with us
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto w-full max-w-[86rem] px-5 sm:px-8">
        <motion.img
          src={siteSettings.logo.src}
          alt={siteSettings.logo.alt}
          width={92}
          height={92}
          className="h-20 w-20 lg:h-24 lg:w-24"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="eyebrow mt-8 text-gold"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Dulal Arts • Gifts &amp; Decor
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.03] text-ink-foreground sm:text-6xl lg:text-7xl">
          <AnimatedText
            lines={["Where Every Idea Is", "As Unique As You Are"]}
            delay={0.4}
          />
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-[0.975rem] leading-relaxed text-ink-foreground/75"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          Thoughtfully crafted gifts, customized creations and beautiful decor designed to make every
          occasion unforgettable.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
        >
          <WhatsAppButton message={messages.general} label="Customize With Us" variant="gold" size="lg" />
          <ActionButton to="/gallery" variant="ghost" size="lg">
            Explore Our Work
          </ActionButton>
        </motion.div>
      </div>
    </section>
  );
}

function GoldParticles() {
  const reduce = useReducedMotion();
  const dots = [
    { left: "12%", top: "26%", size: 4, delay: 0 },
    { left: "28%", top: "62%", size: 3, delay: 1.2 },
    { left: "47%", top: "18%", size: 5, delay: 0.6 },
    { left: "68%", top: "48%", size: 3, delay: 1.8 },
    { left: "82%", top: "24%", size: 4, delay: 0.9 },
    { left: "91%", top: "66%", size: 3, delay: 2.2 },
  ];

  if (reduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full border border-gold/10" />
      {dots.map((dot) => (
        <motion.span
          key={dot.left + dot.top}
          className="absolute rounded-full bg-gold/70"
          style={{ left: dot.left, top: dot.top, width: dot.size, height: dot.size }}
          initial={{ opacity: 0.15, y: 0 }}
          animate={{ opacity: [0.15, 0.8, 0.15], y: [-6, 6, -6] }}
          transition={{ duration: 7, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
