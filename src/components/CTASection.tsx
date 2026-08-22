import { messages, whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "./Reveal";
import { ActionButton, WhatsAppButton } from "./WhatsAppButton";

/** Dark, gold-accented customization CTA used on every page. */
export function CTASection({
  eyebrow = "Customization",
  title = "Have An Idea In Mind?",
  text = "Tell us what you're imagining. We'll help turn your idea into something special.",
  message = messages.general,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  message?: string;
}) {
  const wa = whatsappLink(message);

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground lg:py-32">
      <Decor />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-gold">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 text-4xl leading-[1.05] text-balance-tight sm:text-5xl lg:text-6xl">{title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <span className="rule-gold mx-auto mt-8" />
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-xl text-[0.975rem] leading-relaxed text-ink-foreground/70">{text}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <WhatsAppButton message={message} label="Customize With Us" variant="gold" size="lg" />
            <ActionButton
              href={wa ?? undefined}
              to={wa ? undefined : "/contact"}
              variant="ghost"
              size="lg"
            >
              {wa ? "Chat on WhatsApp" : "Contact Us"}
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Decor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -left-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-gold/15" />
      <span className="absolute -right-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-gold/10" />
      <span className="absolute left-1/2 top-10 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <span className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}
