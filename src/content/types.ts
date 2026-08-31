/**
 * Content model for Dulal Arts.
 *
 * These types mirror a headless-CMS schema (Product, Service, Category,
 * GalleryProject, Testimonial, SiteSettings). Every UI component consumes
 * this data through the query helpers in `src/content/queries.ts`, so the
 * content source can later be swapped for a CMS without touching the UI.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type SiteSettings = {
  brandName: string;
  brandSuffix: string;
  tagline: string;
  whatsappNumber: string | null;
  phone: string | null;
  email: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  address: string | null;
  logo: ImageAsset;
  navigation: { label: string; to: string }[];
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  coverImage: ImageAsset | null;
  featured: boolean;
  order: number;
};

export type Service = {
  title: string;
  slug: string;
  category?: string;
  shortDescription: string;
  description: string;
  image: ImageAsset | null;
  featured: boolean;
  order: number;
};

export type Product = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  images: ImageAsset[];
  featuredImage: ImageAsset | null;
  price: string | null;
  showPrice: boolean;
  customizationAvailable: boolean;
  customizationDetails: string[];
  featured: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type GalleryCategory =
  | "gifts"
  | "birthdays"
  | "decor"
  | "hampers"
  | "events"
  | "custom";

export type GalleryProject = {
  title: string;
  slug: string;
  category: GalleryCategory;
  coverImage: ImageAsset;
  galleryImages: ImageAsset[];
  description: string;
  occasion: string | null;
  featured: boolean;
  order: number;
};

export type Testimonial = {
  customerName: string;
  review: string;
  stars: number;
  order: number;
};

export type WhyPoint = {
  title: string;
  description: string;
};
