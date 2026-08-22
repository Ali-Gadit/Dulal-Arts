import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

/** Fades content upward the first time it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Reveals an image from behind a clip-path mask. */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ clipPath: reduce ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName ?? "h-full w-full object-cover"}
      />
    </motion.div>
  );
}

/** Reveals a heading line by line. */
export function AnimatedText({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduce ? { opacity: 1 } : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
