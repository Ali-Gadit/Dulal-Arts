import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Editorial page header used on every inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-cream pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        {crumbs ? (
          <Reveal>
            <Breadcrumbs items={crumbs} />
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <p className="eyebrow mt-8 text-primary">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] text-balance-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <span className="rule-gold mt-8" />
        </Reveal>
        {intro ? (
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-[0.975rem] leading-relaxed text-muted-foreground">{intro}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </header>
  );
}
