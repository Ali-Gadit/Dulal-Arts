import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Instagram } from "lucide-react";
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
  getProductsByCategory,
  getTestimonials,
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
  component: HomePage,
});

function HomePage() {
  const services = getFeaturedServices();
  const categories = getFeaturedCategories().slice(0, 6);
  const products = getFeaturedProducts().slice(0, 6);
  const projects = getGalleryProjects().slice(0, 6);
  const feature = getFeaturedGalleryProject();
  const testimonials = getTestimonials();

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

      {/* Featured collections */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Collections"
            title="Our Collections"
            intro="Explore our work by occasion — every collection can be customized around your idea."
          />
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Featured products */}
      <section className="border-y border-border bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Selected Pieces"
            title="Made By Hand, For One Person"
            intro="A small selection of what we create. Everything here can be adapted, engraved or rebuilt around your idea."
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} delay={i * 0.05} />
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-14">
              <ActionButton to="/collections" variant="outline" size="md">
                Browse Collections
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
      <section className="border-b border-border bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHeading eyebrow="Why Us" title="Why Choose Dulal Arts?" align="center" />
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
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — hidden until real reviews exist */}
      {testimonials.length > 0 ? (
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
            <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" align="center" />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.customerName} delay={i * 0.06} className="frame-gold bg-card p-8">
                  <span aria-hidden="true" className="font-display text-4xl text-gold">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 text-[0.95rem] leading-relaxed text-foreground">
                    {t.review}
                  </blockquote>
                  <p className="mt-6 text-sm text-foreground">{t.customerName}</p>
                  {t.occasion ? (
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-gold">{t.occasion}</p>
                  ) : null}
                </Reveal>
              ))}
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
