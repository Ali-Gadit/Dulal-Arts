import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Facebook } from "lucide-react";
import { siteSettings } from "@/content/data";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { ActionButton } from "./WhatsAppButton";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const wa = whatsappLink(messages.general);

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={siteSettings.logo.src}
                alt={siteSettings.logo.alt}
                width={64}
                height={64}
                loading="lazy"
                className="h-16 w-16"
              />
              <span>
                <span className="block font-display text-2xl tracking-wide">
                  {siteSettings.brandName}
                </span>
                <span className="eyebrow mt-1 block text-gold">{siteSettings.brandSuffix}</span>
              </span>
            </div>
            <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-ink-foreground/85">
              “{siteSettings.tagline}”
            </p>
            <span className="rule-gold mt-8" />
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-sm text-ink-foreground/75 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-gold">Have an idea? Let's create it.</p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <ActionButton
                href={wa ?? undefined}
                to={wa ? undefined : "/contact"}
                variant="gold"
                size="md"
              >
                Customize With Us
              </ActionButton>
              <div className="flex items-center gap-4 pt-2">
                {siteSettings.facebookUrl ? (
                  <a
                    href={siteSettings.facebookUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Dulal Arts on Facebook"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm frame-gold text-gold transition-colors hover:bg-gold hover:text-ink"
                  >
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
                {siteSettings.instagramUrl ? (
                  <a
                    href={siteSettings.instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Dulal Arts on Instagram"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm frame-gold text-gold transition-colors hover:bg-gold hover:text-ink"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Chat with Dulal Arts on WhatsApp"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm frame-gold text-gold transition-colors hover:bg-gold hover:text-ink"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-gold/20 pt-8 text-[0.7rem] uppercase tracking-[0.18em] text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName}. All rights reserved.
          </p>
          <p>{siteSettings.brandSuffix}</p>
        </div>
      </div>
    </footer>
  );
}
