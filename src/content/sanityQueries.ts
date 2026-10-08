import { client, urlFor } from "@/lib/sanity";
import type {
  Category,
  GalleryProject,
  Product,
  Service,
  SiteSettings,
  Testimonial,
  WhyPoint,
} from "./types";

// Helper to resolve images
const resolveImage = (img: any) => {
  if (!img || !img.asset) return null;
  return {
    src: urlFor(img).url(),
    alt: img.alt || "",
  };
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await client.fetch(`*[_type == "siteSettings"][0]`);
  return {
    brandName: data.brandName || "Dulal Arts",
    brandSuffix: data.brandSuffix || "",
    tagline: data.tagline || "",
    whatsappNumber: data.whatsappNumber || null,
    phone: data.phone || null,
    email: data.email || null,
    instagramUrl: data.instagramUrl || null,
    facebookUrl: data.facebookUrl || null,
    address: data.address || null,
    logo: resolveImage(data.logo) || { src: "", alt: "" },
    navigation: data.navigation || [],
  };
}

export async function getHomePageData() {
  const data = await client.fetch(`*[_type == "homePage"][0]`);
  if (!data) return {};

  return {
    heroTitle: data.heroTitle,
    heroSubtitle: data.heroSubtitle,
    heroImage: resolveImage(data.heroImage),
    storyTitle: data.storyTitle,
    storyText: data.storyText,
    storyImage: resolveImage(data.storyImage),
    featuredProjectImage: resolveImage(data.featuredProjectImage),
    instagramFeed: (data.instagramFeed || []).map(resolveImage),
  };
}

export async function getAboutPageData() {
  const data = await client.fetch(`*[_type == "aboutPage"][0]`);
  return {
    title: data.title,
    intro: data.intro,
    storyTitle: data.storyTitle,
    storyText: data.storyText || [],
    image1: resolveImage(data.image1),
    image2: resolveImage(data.image2),
  };
}

import serviceCustomGifts from "@/assets/service-custom-gifts.jpg";
import serviceHampers from "@/assets/service-hampers.jpg";
import serviceEventDecor from "@/assets/service-event-decor.jpg";
import serviceBirthday from "@/assets/service-birthday.jpg";
import serviceDecor from "@/assets/service-decor.jpg";

const serviceFallbacks = [
  serviceCustomGifts,
  serviceHampers,
  serviceEventDecor,
  serviceBirthday,
  serviceDecor,
];

export async function getServices(): Promise<Service[]> {
  const data = await client.fetch(`*[_type == "service"] | order(order asc)`);
  return data.map((s: any, i: number) => ({
    title: s.title,
    slug: s.slug.current,
    category: s.category || "Other",
    shortDescription: s.shortDescription,
    description: s.description,
    image: resolveImage(s.image) || {
      src: serviceFallbacks[i % serviceFallbacks.length],
      alt: s.title,
    },
    price: s.price, featured: s.featured,
    order: s.order,
  }));
}

export async function getCategories(): Promise<Category[]> {
  const data = await client.fetch(`*[_type == "category"] | order(order asc)`);
  return data.map((c: any) => ({
    name: c.name,
    slug: c.slug.current,
    description: c.description,
    coverImage: resolveImage(c.coverImage),
    featured: c.featured,
    order: c.order,
  }));
}

export async function getProducts(): Promise<Product[]> {
  const data = await client.fetch(`*[_type == "product"] | order(order asc)`);
  return data.map((p: any) => ({
    title: p.title,
    slug: p.slug.current,
    category: p.category,
    shortDescription: p.shortDescription,
    description: p.description,
    images: (p.images || []).map(resolveImage),
    featuredImage: resolveImage(p.featuredImage),
    price: p.price,
    customizationAvailable: p.customizationAvailable,
    customizationDetails: p.customizationDetails || [],
    price: p.price, featured: p.featured,
    order: p.order,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
  }));
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((s) => s.slug === slug);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getGalleryProjects(): Promise<GalleryProject[]> {
  const data = await client.fetch(`*[_type == "galleryProject"] | order(order asc)`);
  return data.map((p: any) => ({
    title: p.title,
    slug: p.slug.current,
    category: p.category,
    coverImage: resolveImage(p.coverImage),
    galleryImages: (p.galleryImages || []).map(resolveImage),
    description: p.description,
    occasion: p.occasion,
    price: p.price, featured: p.featured,
    order: p.order,
  }));
}

export async function getGalleryProjectBySlug(slug: string): Promise<GalleryProject | undefined> {
  const projects = await getGalleryProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedServices(): Promise<Service[]> {
  const services = await getServices();
  return services.filter((s) => s.featured);
}

export async function getFeaturedCategories(): Promise<Category[]> {
  const categories = await getCategories();
  return categories.filter((c) => c.featured);
}

export async function getFeaturedGalleryProject(): Promise<GalleryProject | undefined> {
  const projects = await getGalleryProjects();
  return projects.find((p) => p.featured);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await client.fetch(`*[_type == "testimonial"] | order(order asc)`);
  return data.map((t: any) => ({
    customerName: t.customerName,
    review: t.review,
    stars: t.stars || 5,
    order: t.order || 0,
  }));
}

export async function getWhyPoints(): Promise<WhyPoint[]> {
  const data = await client.fetch(`*[_type == "whyPoint"] | order(order asc)`);
  return data.map((w: any) => ({
    title: w.title,
    description: w.description,
    order: w.order,
  }));
}

