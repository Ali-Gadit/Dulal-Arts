import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryProject } from "@/content/types";

export function GalleryLightbox({
  projects,
  index,
  onClose,
  onChange,
}: {
  projects: GalleryProject[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const touchStart = useRef<number | null>(null);
  const open = index !== null && projects.length > 0;
  const project = open ? projects[index as number] : undefined;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(((index as number) + 1) % projects.length);
      if (e.key === "ArrowLeft")
        onChange(((index as number) - 1 + projects.length) % projects.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, projects.length, onChange, onClose]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-ink/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStart.current;
            const end = e.changedTouches[0]?.clientX;
            if (start == null || end == null) return;
            const delta = end - start;
            if (Math.abs(delta) < 50) return;
            onChange(
              delta < 0
                ? ((index as number) + 1) % projects.length
                : ((index as number) - 1 + projects.length) % projects.length,
            );
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="eyebrow text-gold">
              {(index as number) + 1} / {projects.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm frame-gold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            <button
              type="button"
              onClick={() => onChange(((index as number) - 1 + projects.length) % projects.length)}
              aria-label="Previous image"
              className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-sm frame-gold text-ink-foreground transition-colors hover:bg-ink-foreground/10 sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <motion.img
              key={project.slug}
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-full object-contain"
            />

            <button
              type="button"
              onClick={() => onChange(((index as number) + 1) % projects.length)}
              aria-label="Next image"
              className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-sm frame-gold text-ink-foreground transition-colors hover:bg-ink-foreground/10 sm:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mx-auto w-full max-w-3xl px-6 py-8 text-center">
            <h2 className="font-display text-2xl text-ink-foreground">{project.title}</h2>
            <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-gold">
              {project.occasion ?? project.category}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/70">
              {project.description}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
