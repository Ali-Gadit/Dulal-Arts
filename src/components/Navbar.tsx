import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteSettings } from "@/content/data";
import { messages } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Collections", to: "/collections" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !overHero;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          solid
            ? "border-b border-gold/25 bg-background/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[86rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
          <Link to="/" className="flex items-center gap-3" aria-label={`${siteSettings.brandName} home`}>
            <img
              src={siteSettings.logo.src}
              alt={siteSettings.logo.alt}
              width={48}
              height={48}
              className="h-11 w-11 lg:h-12 lg:w-12"
            />
            <span className="hidden leading-none sm:block">
              <span
                className={`block font-display text-lg tracking-wide ${
                  solid ? "text-foreground" : "text-ink-foreground"
                }`}
              >
                {siteSettings.brandName}
              </span>
              <span className={`eyebrow mt-1 block text-[0.55rem] ${solid ? "text-gold" : "text-gold-soft"}`}>
                {siteSettings.brandSuffix}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className={`link-underline text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  solid ? "text-foreground/75 hover:text-primary" : "text-ink-foreground/85 hover:text-gold"
                }`}
                activeProps={{ className: solid ? "text-primary" : "text-gold" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <WhatsAppButton
              message={messages.general}
              label="Customize With Us"
              variant={solid ? "solid" : "gold"}
              size="sm"
              className="hidden md:inline-flex"
            />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-sm frame-gold lg:hidden ${
                solid ? "text-foreground" : "text-ink-foreground"
              }`}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex h-[4.5rem] items-center justify-between px-5 sm:px-8">
              <img
                src={siteSettings.logo.src}
                alt={siteSettings.logo.alt}
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm frame-gold text-ink-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-6 px-5 sm:px-8" aria-label="Mobile">
              <ul className="divide-y divide-gold/20">
                {links.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={link.to}
                      className="block py-5 font-display text-3xl text-ink-foreground"
                      activeProps={{ className: "text-gold" }}
                      activeOptions={{ exact: link.to === "/" }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <WhatsAppButton message={messages.general} label="Customize With Us" variant="gold" size="md" />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
