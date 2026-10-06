import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Instagram, Mail, MapPin, MessageCircle, Phone, Facebook } from "lucide-react";
import { siteSettings } from "@/content/data";
import { getServices } from "@/content/queries";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { ActionButton, WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Create Something Beautiful | Dulal Arts" },
      {
        name: "description",
        content:
          "Share your idea with Dulal Arts. Send an inquiry or message us on WhatsApp to customize gifts, hampers and celebration decor.",
      },
      { property: "og:title", content: "Let's Create Something Beautiful — Contact Dulal Arts" },
      {
        property: "og:description",
        content: "Tell us about your occasion and we'll design something around it.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  occasion: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Tell us a little more about your idea"),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";
const labelClass =
  "block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground";

function ContactPage() {
  const services = getServices();
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submittedLink = submitted
    ? whatsappLink(
        messages.inquiry({
          name: submitted.name,
          phone: submitted.phone,
          ...(submitted.email ? { email: submitted.email } : {}),
          ...(submitted.occasion ? { occasion: submitted.occasion } : {}),
          ...(submitted.service ? { service: submitted.service } : {}),
          message: submitted.message,
        }),
      )
    : null;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Create Something Beautiful"
        intro="Tell us about the occasion, the person and what you're imagining. We'll take it from there."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-xl px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Reach Us Directly</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <span className="rule-gold mx-auto mt-6" />
          </Reveal>

          <ul className="mt-10 space-y-6 text-left">
            {siteSettings.whatsappNumber ? (
              <ContactRow icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp">
                <a
                  href={whatsappLink(messages.general) ?? "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline"
                >
                  {siteSettings.whatsappNumber}
                </a>
              </ContactRow>
            ) : null}
            {siteSettings.phone ? (
              <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone">
                <a href={`tel:${siteSettings.phone}`} className="link-underline">
                  {siteSettings.phone}
                </a>
              </ContactRow>
            ) : null}
            {siteSettings.email ? (
              <ContactRow icon={<Mail className="h-4 w-4" />} label="Email">
                <a href={`mailto:${siteSettings.email}`} className="link-underline">
                  {siteSettings.email}
                </a>
              </ContactRow>
            ) : null}
            {siteSettings.address ? (
              <ContactRow icon={<MapPin className="h-4 w-4" />} label="Location">
                {siteSettings.address}
              </ContactRow>
            ) : null}
            {siteSettings.instagramUrl ? (
              <ContactRow icon={<Instagram className="h-4 w-4" />} label="Instagram">
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline"
                >
                  @dulal.arts
                </a>
              </ContactRow>
            ) : null}
            {siteSettings.facebookUrl ? (
              <ContactRow icon={<Facebook className="h-4 w-4" />} label="Facebook">
                <a
                  href={siteSettings.facebookUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline"
                >
                  Dulal Arts
                </a>
              </ContactRow>
            ) : null}
          </ul>

          <div className="mt-12 flex justify-center">
            <WhatsAppButton
              message={messages.general}
              label="Message Us Now"
              variant="solid"
              size="lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm frame-gold text-gold">
        {icon}
      </span>
      <span>
        <span className="block text-[0.62rem] uppercase tracking-[0.22em] text-gold">{label}</span>
        <span className="mt-1 block text-sm text-foreground">{children}</span>
      </span>
    </li>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-xs text-destructive">
      {message}
    </p>
  );
}
