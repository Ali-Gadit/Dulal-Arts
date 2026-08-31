import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { siteSettings } from "@/content/data";
import { messages, whatsappLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const wa = whatsappLink(messages.general);

  if (!wa) return null;

  return (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Dulal Arts on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
