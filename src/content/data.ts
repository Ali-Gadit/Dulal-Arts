import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";
import story from "@/assets/story.jpg";
import serviceCustomGifts from "@/assets/service-custom-gifts.jpg";
import serviceHampers from "@/assets/service-hampers.jpg";
import serviceEventDecor from "@/assets/service-event-decor.jpg";
import serviceBirthday from "@/assets/service-birthday.jpg";
import serviceDecor from "@/assets/service-decor.jpg";
import collectionBirthday from "@/assets/collection-birthday.jpg";
import collectionAnniversary from "@/assets/collection-anniversary.jpg";
import collectionWedding from "@/assets/collection-wedding.jpg";
import collectionBaby from "@/assets/collection-baby.jpg";
import collectionCorporate from "@/assets/collection-corporate.jpg";
import galleryAnniversarySetup from "@/assets/gallery-anniversary-setup.jpg";
import galleryEngagement from "@/assets/gallery-engagement.jpg";
import galleryBouquet from "@/assets/gallery-bouquet.jpg";
import featuredProject from "@/assets/featured-project.jpg";
import productFrame from "@/assets/product-frame.jpg";

import type {
  Category,
  GalleryProject,
  Product,
  Service,
  SiteSettings,
  Testimonial,
  WhyPoint,
} from "./types";

export const heroImage = {
  src: hero,
  alt: "Burgundy velvet gift boxes tied with gold ribbon beside candlelight",
};
export const storyImage = {
  src: story,
  alt: "Hands tying a gold ribbon around a handcrafted gift box",
};
export const featuredProjectImage = {
  src: featuredProject,
  alt: "Deep red and gold birthday celebration setup with florals, candles and a styled gift table",
};

/**
 * Contact details are intentionally left null until the business provides them.
 * Filling these in is the only change needed to activate phone/email/WhatsApp.
 */
export const siteSettings: SiteSettings = {
  brandName: "Dulal Arts",
  brandSuffix: "Gifts & Decor",
  tagline: "Where Every Idea Is As Unique As You Are",
  whatsappNumber: "+92 312 2496325",
  phone: null,
  email: "akramdua96@gmail.com",
  instagramUrl: "https://www.instagram.com/dulal.arts/",
  facebookUrl: "https://www.facebook.com/CreationsByDua",
  address: null,
  logo: { src: logo, alt: "Dulal Arts — Gifts & Decor", width: 1024, height: 1024 },
};

export const services: Service[] = [
  {
    title: "Customized Gifts",
    slug: "customized-gifts",
    shortDescription: "Personalized gifts created around the person, occasion and story.",
    description:
      "We begin with the person, not the product. A name, a date, a memory, an inside joke — anything can become the starting point for a gift made only for them.",
    image: {
      src: serviceCustomGifts,
      alt: "Engraved keepsake box with monogrammed cards and dried roses",
    },
    featured: true,
    order: 1,
    relatedProducts: ["engraved-keepsake-box", "personalized-photo-frame"],
  },
  {
    title: "Gift Hampers",
    slug: "gift-hampers",
    shortDescription:
      "Curated hampers designed for birthdays, celebrations, corporate gifting and special occasions.",
    description:
      "Each hamper is composed rather than filled — chosen pieces, considered packaging and finishing details that make opening it part of the gift.",
    image: { src: serviceHampers, alt: "Luxury curated gift hamper with a large gold bow" },
    featured: true,
    order: 2,
    relatedProducts: ["signature-celebration-hamper"],
  },
  {
    title: "Event & Party Decor",
    slug: "event-party-decor",
    shortDescription:
      "Creative decoration concepts for birthdays, celebrations and special events.",
    description:
      "From a single styled corner to a full room, we design decor that photographs beautifully and feels warm to stand inside.",
    image: {
      src: serviceEventDecor,
      alt: "Burgundy and gold balloon arch with draped fabric and floral styling",
    },
    featured: true,
    order: 3,
    relatedProducts: [],
  },
  {
    title: "Birthday Setups",
    slug: "birthday-setups",
    shortDescription:
      "Beautiful birthday arrangements including themed decor, backdrops and table styling.",
    description:
      "Themed backdrops, balloon work, cake tables and the small details that turn a room into a surprise.",
    image: {
      src: serviceBirthday,
      alt: "Elegant birthday setup with gold and deep red balloons and a styled cake",
    },
    featured: true,
    order: 4,
    relatedProducts: [],
  },
  {
    title: "Customized Decor",
    slug: "customized-decor",
    shortDescription: "Personalized decorative pieces created according to customer requirements.",
    description:
      "Nameplates, resin pieces, framed art and keepsakes made to sit naturally in your home long after the occasion.",
    image: {
      src: serviceDecor,
      alt: "Handcrafted gold-leaf art piece and engraved nameplate on a shelf",
    },
    featured: false,
    order: 5,
    relatedProducts: ["gold-leaf-nameplate"],
  },
  {
    title: "Special Occasion Gifts",
    slug: "special-occasion-gifts",
    shortDescription:
      "Thoughtful creations for anniversaries, engagements, weddings, baby celebrations and other memorable occasions.",
    description:
      "Gifts built around milestones — the ones people keep, revisit and talk about years later.",
    image: {
      src: collectionAnniversary,
      alt: "Anniversary gift arrangement with red roses and a gold-framed photo",
    },
    featured: false,
    order: 6,
    relatedProducts: ["anniversary-rose-box", "wedding-trousseau-set"],
  },
  {
    title: "Corporate Gifting",
    slug: "corporate-gifting",
    shortDescription:
      "Professional customized gifting solutions for businesses, employees, clients and events.",
    description:
      "Consistent, brand-aware gifting at scale — refined packaging, personalization options and reliable presentation.",
    image: {
      src: collectionCorporate,
      alt: "Matte black corporate gift set with gold foil detailing",
    },
    featured: false,
    order: 7,
    relatedProducts: ["corporate-signature-set"],
  },
];

export const categories: Category[] = [
  {
    name: "Birthday Gifts",
    slug: "birthday-gifts",
    description: "Gift boxes, cards and keepsakes styled for the day itself.",
    coverImage: {
      src: collectionBirthday,
      alt: "Birthday gift box with gold bow, candle and small cake",
    },
    featured: true,
    order: 1,
  },
  {
    name: "Anniversary Gifts",
    slug: "anniversary-gifts",
    description: "Quiet, romantic pieces made for shared milestones.",
    coverImage: {
      src: collectionAnniversary,
      alt: "Anniversary rose box with gold-framed photograph and candles",
    },
    featured: true,
    order: 2,
  },
  {
    name: "Wedding Gifts",
    slug: "wedding-gifts",
    description: "Trousseau packing, ceremony trays and gifting for both families.",
    coverImage: {
      src: collectionWedding,
      alt: "Ivory and gold wedding trousseau trays with floral detailing",
    },
    featured: true,
    order: 3,
  },
  {
    name: "Customized Hampers",
    slug: "customized-hampers",
    description: "Hampers composed around a budget, a theme or a person.",
    coverImage: { src: serviceHampers, alt: "Curated hamper basket wrapped with a gold bow" },
    featured: true,
    order: 4,
  },
  {
    name: "Baby Gifts",
    slug: "baby-gifts",
    description: "Soft, gentle sets to welcome someone new.",
    coverImage: {
      src: collectionBaby,
      alt: "Neutral baby gift set with knitted blanket and wooden name blocks",
    },
    featured: true,
    order: 5,
  },
  {
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    description: "Considered gifting for teams, clients and events.",
    coverImage: { src: collectionCorporate, alt: "Black and gold corporate gifting set" },
    featured: true,
    order: 6,
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    description: "Handmade pieces that live on after the occasion.",
    coverImage: {
      src: serviceDecor,
      alt: "Gold-leaf resin art and engraved nameplate styled on a shelf",
    },
    featured: false,
    order: 7,
  },
  {
    name: "Personalized Gifts",
    slug: "personalized-gifts",
    description: "Names, dates, notes and details engraved or printed by hand.",
    coverImage: {
      src: productFrame,
      alt: "Personalized wooden photo frame with a handwritten note",
    },
    featured: false,
    order: 8,
  },
  {
    name: "Celebration Decor",
    slug: "celebration-decor",
    description: "Backdrops, balloon work and styled tables for any celebration.",
    coverImage: {
      src: serviceEventDecor,
      alt: "Celebration backdrop with balloon arch and draped fabric",
    },
    featured: false,
    order: 9,
  },
];

export const products: Product[] = [
  {
    title: "Engraved Keepsake Box",
    slug: "engraved-keepsake-box",
    category: "personalized-gifts",
    shortDescription: "A wooden keepsake box engraved with a name, date or short message.",
    description:
      "A hand-finished wooden box engraved with the details that matter, packed with matching cards and a fabric pouch. Made to hold letters, jewellery and small things worth keeping.",
    images: [
      { src: serviceCustomGifts, alt: "Engraved wooden keepsake box with monogrammed cards" },
      { src: productFrame, alt: "Personalized frame and handwritten note styling" },
    ],
    featuredImage: {
      src: serviceCustomGifts,
      alt: "Engraved wooden keepsake box with monogrammed cards",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: [
      "Engraved name, initials or date",
      "Choice of wood finish",
      "Matching card and pouch printing",
      "Message card written by hand",
    ],
    featured: true,
    order: 1,
  },
  {
    title: "Personalized Photo Frame",
    slug: "personalized-photo-frame",
    category: "personalized-gifts",
    shortDescription: "An engraved frame paired with a handwritten note and wax seal.",
    description:
      "A simple frame, engraved with your words, presented with a handmade paper note, dried florals and a gold wax seal.",
    images: [
      {
        src: productFrame,
        alt: "Personalized wooden photo frame beside a handwritten sealed note",
      },
    ],
    featuredImage: {
      src: productFrame,
      alt: "Personalized wooden photo frame beside a handwritten sealed note",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: [
      "Engraved name and message",
      "Frame size options",
      "Handwritten note card",
    ],
    featured: true,
    order: 2,
  },
  {
    title: "Signature Celebration Hamper",
    slug: "signature-celebration-hamper",
    category: "customized-hampers",
    shortDescription: "A curated hamper of treats, candles and florals, finished with a gold bow.",
    description:
      "Composed around your budget and the occasion — chocolates, candles, dried florals and personalized tags, wrapped and finished by hand.",
    images: [
      { src: serviceHampers, alt: "Celebration hamper basket with treats, candle and gold bow" },
    ],
    featuredImage: {
      src: serviceHampers,
      alt: "Celebration hamper basket with treats, candle and gold bow",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: [
      "Choose the contents and budget",
      "Colour theme and wrapping style",
      "Personalized gift tag",
    ],
    featured: true,
    order: 3,
  },
  {
    title: "Birthday Gift Box",
    slug: "birthday-gift-box",
    category: "birthday-gifts",
    shortDescription: "A ready-to-gift birthday box with candle, keepsakes and a personal card.",
    description:
      "A complete birthday box — a scented candle, small keepsakes, chocolates and a card printed with your message, arranged in a gold-ribboned box.",
    images: [
      { src: collectionBirthday, alt: "Birthday gift box with candle, tumbler and personal card" },
    ],
    featuredImage: {
      src: collectionBirthday,
      alt: "Birthday gift box with candle, tumbler and personal card",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: ["Printed name and message", "Colour theme", "Add-on cake or florals"],
    featured: true,
    order: 4,
  },
  {
    title: "Anniversary Rose Box",
    slug: "anniversary-rose-box",
    category: "anniversary-gifts",
    shortDescription: "Preserved roses, a framed photograph and a keepsake box in red and gold.",
    description:
      "A romantic set built around a photograph you choose — roses in a printed hat box, a gold-framed print and a keepsake box for small things.",
    images: [
      {
        src: collectionAnniversary,
        alt: "Anniversary rose box with framed photograph and candles",
      },
    ],
    featuredImage: {
      src: collectionAnniversary,
      alt: "Anniversary rose box with framed photograph and candles",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: [
      "Your photograph printed and framed",
      "Printed message on the box",
      "Rose colour options",
    ],
    featured: true,
    order: 5,
  },
  {
    title: "Wedding Trousseau Set",
    slug: "wedding-trousseau-set",
    category: "wedding-gifts",
    shortDescription: "Ivory and gold trays styled for trousseau packing and ceremony gifting.",
    description:
      "Trays, boxes and wrapping designed as one set, with monograms and detailing repeated across every piece for a cohesive ceremony presentation.",
    images: [
      { src: collectionWedding, alt: "Ivory and gold trousseau trays with monogrammed boxes" },
    ],
    featuredImage: {
      src: collectionWedding,
      alt: "Ivory and gold trousseau trays with monogrammed boxes",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: [
      "Monogram design",
      "Number of trays and boxes",
      "Fabric and colour palette",
    ],
    featured: false,
    order: 6,
  },
  {
    title: "Baby Welcome Set",
    slug: "baby-welcome-set",
    category: "baby-gifts",
    shortDescription: "A soft neutral set with blanket, name blocks and welcome card.",
    description:
      "Gentle, practical pieces for a new arrival — a knitted blanket, engraved name blocks, first shoes and a welcome card, packed in a keepsake box.",
    images: [
      {
        src: collectionBaby,
        alt: "Baby welcome gift set with blanket, shoes and engraved name blocks",
      },
    ],
    featuredImage: {
      src: collectionBaby,
      alt: "Baby welcome gift set with blanket, shoes and engraved name blocks",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: ["Engraved baby name", "Colour palette", "Add-on keepsake frame"],
    featured: true,
    order: 7,
  },
  {
    title: "Corporate Signature Set",
    slug: "corporate-signature-set",
    category: "corporate-gifts",
    shortDescription: "Black and gold gifting set with branded notebook, pen and coffee.",
    description:
      "A restrained, professional set that carries your brand quietly — foil-stamped notebook, pen, coffee tin and thank-you card in a rigid box.",
    images: [
      {
        src: collectionCorporate,
        alt: "Black and gold corporate gift set with notebook, pen and coffee tin",
      },
    ],
    featuredImage: {
      src: collectionCorporate,
      alt: "Black and gold corporate gift set with notebook, pen and coffee tin",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: ["Logo foil stamping", "Bulk quantities", "Custom insert card"],
    featured: false,
    order: 8,
  },
  {
    title: "Gold Leaf Nameplate",
    slug: "gold-leaf-nameplate",
    category: "home-decor",
    shortDescription: "A handmade nameplate and gold-leaf resin piece for the entryway.",
    description:
      "Handmade resin and brass work in gold and ivory, finished to sit on a console or hang beside a door.",
    images: [
      { src: serviceDecor, alt: "Gold-leaf resin art piece and brass nameplate on a shelf" },
    ],
    featuredImage: {
      src: serviceDecor,
      alt: "Gold-leaf resin art piece and brass nameplate on a shelf",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: [
      "Family or business name",
      "Size and shape",
      "Gold, ivory or burgundy palette",
    ],
    featured: false,
    order: 9,
  },
  {
    title: "Chocolate & Flower Bouquet",
    slug: "chocolate-flower-bouquet",
    category: "birthday-gifts",
    shortDescription: "A hand-wrapped bouquet of blooms and chocolates in burgundy and gold.",
    description:
      "Fresh or preserved blooms arranged with chocolates, wrapped in burgundy paper and tied with gold ribbon, with a printed message card tucked inside.",
    images: [
      {
        src: galleryBouquet,
        alt: "Chocolate and flower bouquet wrapped in burgundy paper with gold ribbon",
      },
    ],
    featuredImage: {
      src: galleryBouquet,
      alt: "Chocolate and flower bouquet wrapped in burgundy paper with gold ribbon",
    },
    price: null,
    showPrice: false,
    customizationAvailable: true,
    customizationDetails: ["Bloom and chocolate selection", "Wrapping colour", "Message card"],
    featured: true,
    order: 10,
  },
];

export const galleryProjects: GalleryProject[] = [
  {
    title: "A Little More Than A Gift",
    slug: "a-little-more-than-a-gift",
    category: "birthdays",
    coverImage: featuredProjectImage,
    galleryImages: [
      featuredProjectImage,
      { src: serviceBirthday, alt: "Cake table with gold and deep red balloon installation" },
      { src: collectionBirthday, alt: "Birthday gift box styled with candles and confetti" },
    ],
    description:
      "A birthday setup built around one idea — that the gifts should feel like part of the room. Gold foliage, deep red florals, draped fabric and a styled gift table where every box was wrapped to match the backdrop.",
    occasion: "Birthday celebration",
    featured: true,
    order: 1,
  },
  {
    title: "Candlelit Anniversary Table",
    slug: "candlelit-anniversary-table",
    category: "events",
    coverImage: {
      src: galleryAnniversarySetup,
      alt: "Candlelit anniversary table with red roses and gold candelabra",
    },
    galleryImages: [
      {
        src: galleryAnniversarySetup,
        alt: "Candlelit anniversary table with red roses and gold candelabra",
      },
      { src: collectionAnniversary, alt: "Anniversary rose box and framed photograph" },
    ],
    description:
      "An intimate dinner for two, layered with candlelight, rose petals and a soft fairy-lit backdrop.",
    occasion: "Anniversary",
    featured: true,
    order: 2,
  },
  {
    title: "Engagement Ring Platter",
    slug: "engagement-ring-platter",
    category: "decor",
    coverImage: {
      src: galleryEngagement,
      alt: "Ornate engagement ring platter in burgundy velvet and gold",
    },
    galleryImages: [
      { src: galleryEngagement, alt: "Ornate engagement ring platter in burgundy velvet and gold" },
      { src: collectionWedding, alt: "Ivory and gold ceremony trays" },
    ],
    description:
      "Burgundy velvet, gold embroidery and fresh blooms, made to carry one very small, very important thing.",
    occasion: "Engagement",
    featured: true,
    order: 3,
  },
  {
    title: "Signature Hamper Composition",
    slug: "signature-hamper-composition",
    category: "hampers",
    coverImage: { src: serviceHampers, alt: "Curated hamper with treats, candle and gold bow" },
    galleryImages: [
      { src: serviceHampers, alt: "Curated hamper with treats, candle and gold bow" },
    ],
    description:
      "A hamper composed in burgundy and gold, finished with a printed tag and hand-tied bow.",
    occasion: "Celebration gifting",
    featured: false,
    order: 4,
  },
  {
    title: "Balloon Arch & Styled Table",
    slug: "balloon-arch-styled-table",
    category: "decor",
    coverImage: {
      src: serviceEventDecor,
      alt: "Balloon arch with draped burgundy fabric and floral styling",
    },
    galleryImages: [
      {
        src: serviceEventDecor,
        alt: "Balloon arch with draped burgundy fabric and floral styling",
      },
    ],
    description:
      "Draped fabric, layered balloon work and a candlelit table built for photographs from every angle.",
    occasion: "Celebration",
    featured: false,
    order: 5,
  },
  {
    title: "Bouquet In Burgundy",
    slug: "bouquet-in-burgundy",
    category: "gifts",
    coverImage: { src: galleryBouquet, alt: "Burgundy wrapped bouquet with blooms and chocolates" },
    galleryImages: [
      { src: galleryBouquet, alt: "Burgundy wrapped bouquet with blooms and chocolates" },
    ],
    description: "Blooms, chocolates and a hand-written note wrapped in burgundy and gold.",
    occasion: "Birthday",
    featured: false,
    order: 6,
  },
  {
    title: "Engraved Keepsake Story",
    slug: "engraved-keepsake-story",
    category: "custom",
    coverImage: {
      src: serviceCustomGifts,
      alt: "Engraved keepsake box with monogrammed cards and dried roses",
    },
    galleryImages: [
      {
        src: serviceCustomGifts,
        alt: "Engraved keepsake box with monogrammed cards and dried roses",
      },
      { src: productFrame, alt: "Personalized frame and handwritten note" },
    ],
    description:
      "One name, repeated across the box, the cards and the pouch — a small set that reads as one idea.",
    occasion: "Personal gifting",
    featured: false,
    order: 7,
  },
  {
    title: "Welcome, Little One",
    slug: "welcome-little-one",
    category: "gifts",
    coverImage: {
      src: collectionBaby,
      alt: "Baby welcome set with blanket, shoes and name blocks",
    },
    galleryImages: [
      { src: collectionBaby, alt: "Baby welcome set with blanket, shoes and name blocks" },
    ],
    description: "A soft neutral set assembled for a new arrival, with engraved name blocks.",
    occasion: "Baby celebration",
    featured: false,
    order: 8,
  },
  {
    title: "Quiet Luxury Corporate Set",
    slug: "quiet-luxury-corporate-set",
    category: "custom",
    coverImage: { src: collectionCorporate, alt: "Black and gold corporate gifting set" },
    galleryImages: [{ src: collectionCorporate, alt: "Black and gold corporate gifting set" }],
    description:
      "Foil-stamped black packaging for a client gifting round, kept deliberately restrained.",
    occasion: "Corporate gifting",
    featured: false,
    order: 9,
  },
];

/** Empty by design — real reviews only. The section hides itself while empty. */
export const testimonials: Testimonial[] = [];

export const whyPoints: WhyPoint[] = [
  {
    title: "We Care Your Emotions",
    description: "Every celebration is special for you, that's why we treat it with love and care.",
  },
  {
    title: "Customized Just For You",
    description: "We listen to your ideas and create personalized themes that reflect your style.",
  },
  {
    title: "Creative & Unique Designs",
    description: "From Pinterest vibes to elegant setups, we bring creativity in every detail.",
  },
  {
    title: "Quality With Perfection",
    description:
      "We never compromise on quality. We use the best materials and ensure a perfect finish.",
  },
  {
    title: "Affordable & Transparent",
    description: "Beautiful decor and gifts that fit your budget with transparent pricing.",
  },
  {
    title: "On Time, Every Time",
    description: "We value your time and always deliver on our promises.",
  },
  {
    title: "Complete Solution",
    description:
      "From decor to gifts to wrapping, we provide everything under one roof so you can relax and enjoy.",
  },
];

export const instagramFeed = [
  { src: collectionBirthday, alt: "Birthday gift box styled in burgundy and gold" },
  { src: galleryBouquet, alt: "Burgundy wrapped bouquet with chocolates" },
  { src: serviceBirthday, alt: "Birthday balloon and cake setup" },
  { src: serviceCustomGifts, alt: "Engraved keepsake gift set" },
  { src: galleryEngagement, alt: "Engagement ring platter in velvet and gold" },
  { src: serviceHampers, alt: "Curated gift hamper with gold bow" },
];

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export const galleryFilters: { label: string; value: "all" | GalleryProject["category"] }[] = [
  { label: "All", value: "all" },
  { label: "Gifts", value: "gifts" },
  { label: "Birthdays", value: "birthdays" },
  { label: "Decor", value: "decor" },
  { label: "Hampers", value: "hampers" },
  { label: "Events", value: "events" },
  { label: "Custom", value: "custom" },
];
