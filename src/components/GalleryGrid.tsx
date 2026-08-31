import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { galleryFilters } from "@/content/data";
import type { GalleryProject } from "@/content/types";
import { GalleryLightbox } from "./GalleryLightbox";

type Filter = (typeof galleryFilters)[number]["value"];

export function GalleryGrid({
  projects,
  showFilters = true,
}: {
  projects: GalleryProject[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  return (
    <div>
      {showFilters ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by category">
          {galleryFilters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={`rounded-sm px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "frame-gold text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.figure
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
              className="group break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="hover-zoom-media relative block w-full cursor-zoom-in text-left"
                aria-label={`Open ${project.title}`}
              >
                <img
                  src={project.coverImage.src}
                  alt={project.coverImage.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
              </button>
              <figcaption className="mt-4">
                <h3 className="text-lg leading-snug">{project.title}</h3>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-gold">
                  {project.occasion ?? project.category}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">No work in this category yet.</p>
      ) : null}

      <GalleryLightbox
        projects={visible}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </div>
  );
}
