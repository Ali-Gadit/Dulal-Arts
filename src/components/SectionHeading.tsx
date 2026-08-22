import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  const Title = as;
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <Reveal>
          <p className={`eyebrow ${tone === "dark" ? "text-gold" : "text-primary"}`}>{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <Title
          className={`mt-4 text-3xl leading-[1.08] text-balance-tight sm:text-4xl lg:text-5xl ${
            tone === "dark" ? "text-ink-foreground" : "text-foreground"
          }`}
        >
          {title}
        </Title>
      </Reveal>
      <Reveal delay={0.12}>
        <span className={`rule-gold mt-6 ${centered ? "mx-auto" : ""}`} />
      </Reveal>
      {intro ? (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 text-[0.975rem] leading-relaxed ${
              tone === "dark" ? "text-ink-foreground/70" : "text-muted-foreground"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}
