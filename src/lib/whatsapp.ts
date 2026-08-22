import { siteSettings } from "@/content/data";

/**
 * Builds a WhatsApp deep link with a pre-filled contextual message.
 * Returns null when no WhatsApp number is configured in site settings —
 * callers fall back to the contact page rather than a broken link.
 */
export function whatsappLink(message: string): string | null {
  const number = siteSettings.whatsappNumber?.replace(/[^\d]/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const whatsappConfigured = Boolean(siteSettings.whatsappNumber);

export const messages = {
  general: `Hi ${siteSettings.brandName}! I'd like to customize something with you. Could you please share the available options?`,
  product: (name: string) =>
    `Hi ${siteSettings.brandName}! I'm interested in ${name}. Can you please share the price and customization options?`,
  collection: (name: string) =>
    `Hi ${siteSettings.brandName}! I'm interested in your ${name} collection. Could you please share the available options and pricing?`,
  service: (name: string) =>
    `Hi ${siteSettings.brandName}! I'd like to know more about your ${name} service.`,
  project: (name: string) =>
    `Hi ${siteSettings.brandName}! I loved your "${name}" work. Could we create something similar?`,
  inquiry: (fields: {
    name: string;
    phone: string;
    email?: string;
    occasion?: string;
    service?: string;
    message: string;
  }) =>
    [
      `Hi ${siteSettings.brandName}! I'd like to enquire.`,
      `Name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      fields.email ? `Email: ${fields.email}` : null,
      fields.occasion ? `Occasion: ${fields.occasion}` : null,
      fields.service ? `Interested in: ${fields.service}` : null,
      `Message: ${fields.message}`,
    ]
      .filter(Boolean)
      .join("\n"),
};
