import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
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
const labelClass = "block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground";

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
        <div className="mx-auto grid max-w-[86rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">Reach Us Directly</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="rule-gold mt-6" />
            </Reveal>

            <ul className="mt-10 space-y-6">
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
            </ul>

            {!siteSettings.whatsappNumber ? (
              <Reveal delay={0.12}>
                <p className="mt-10 frame-gold bg-card p-6 text-sm leading-relaxed text-muted-foreground">
                  WhatsApp, phone and email details haven't been added yet. Once the business number is set in
                  site settings, every WhatsApp button on the site activates automatically. Until then,
                  Instagram is the fastest way to reach us.
                </p>
              </Reveal>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="frame-gold bg-card p-8 lg:p-10">
                <p className="eyebrow text-gold">Thank you</p>
                <h2 className="mt-5 text-2xl sm:text-3xl">Your inquiry is ready to send</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  We've prepared your details, {submitted.name}. This form doesn't send email yet — tap below to
                  send the same message to us on WhatsApp so nothing gets lost.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ActionButton
                    href={submittedLink ?? undefined}
                    to={submittedLink ? undefined : "/"}
                    variant="solid"
                    size="lg"
                  >
                    {submittedLink ? "Send on WhatsApp" : "Back Home"}
                  </ActionButton>
                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="inline-flex items-center justify-center rounded-sm frame-gold px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-secondary"
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit((values) => setSubmitted(values))}
                className="frame-gold bg-card p-8 lg:p-10"
              >
                <h2 className="text-2xl sm:text-3xl">Send An Inquiry</h2>
                <span className="rule-gold mt-6" />

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Name
                    </label>
                    <input id="name" className={fieldClass} placeholder="Your name" {...register("name")} />
                    <FieldError message={errors.name?.message} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={fieldClass}
                      placeholder="Contact number"
                      {...register("phone")}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={fieldClass}
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="occasion">
                      Occasion
                    </label>
                    <input
                      id="occasion"
                      className={fieldClass}
                      placeholder="Birthday, anniversary…"
                      {...register("occasion")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="service">
                      Interested Service
                    </label>
                    <select id="service" className={fieldClass} defaultValue="" {...register("service")}>
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={fieldClass}
                      placeholder="Tell us what you're imagining…"
                      {...register("message")}
                    />
                    <FieldError message={errors.message?.message} />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-burgundy-deep"
                  >
                    Send Inquiry
                  </button>
                  <WhatsAppButton message={messages.general} label="Chat on WhatsApp" variant="outline" size="lg" />
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  This form prepares your inquiry in the browser and hands it to WhatsApp — no email is sent
                  yet, so nothing is stored.
                </p>
              </form>
            )}
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-xs text-destructive">
      {message}
    </p>
  );
}
