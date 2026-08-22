import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/whatsapp";

type Variant = "solid" | "outline" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500 rounded-sm";

const variants: Record<Variant, string> = {
  solid: "bg-primary text-primary-foreground hover:bg-burgundy-deep",
  outline:
    "frame-gold text-foreground hover:bg-secondary",
  gold: "bg-gold text-ink hover:bg-gold-soft",
  ghost: "text-ink-foreground frame-gold hover:bg-ink-foreground/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5",
  md: "px-6 py-3.5",
  lg: "px-8 py-4",
};

export function ActionButton({
  href,
  to,
  children,
  variant = "solid",
  size = "md",
  className = "",
  arrow = true,
}: {
  href?: string;
  to?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? (
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={to ?? "/contact"} className={cls}>
      {inner}
    </Link>
  );
}

/**
 * WhatsApp CTA. Falls back to the contact page when no WhatsApp number is
 * configured in site settings, so the link is never broken or fake.
 */
export function WhatsAppButton({
  message,
  label = "Customize With Us",
  variant = "solid",
  size = "md",
  className,
}: {
  message: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const link = whatsappLink(message);

  return (
    <ActionButton
      href={link ?? undefined}
      to={link ? undefined : "/contact"}
      variant={variant}
      size={size}
      className={className}
    >
      {label}
    </ActionButton>
  );
}
