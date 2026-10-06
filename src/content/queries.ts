import { categories, galleryProjects, products, services, testimonials } from "./data";
import type { Category, GalleryProject, Product, Service, Testimonial } from "./types";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export const getServices = (): Service[] => [...services].sort(byOrder);
export const getFeaturedServices = (): Service[] => getServices().filter((s) => s.featured);
export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getCategories = (): Category[] => [...categories].sort(byOrder);
export const getFeaturedCategories = (): Category[] => getCategories().filter((c) => c.featured);
export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const getProducts = (): Product[] => [...products].sort(byOrder);
export const getFeaturedProducts = (): Product[] => getProducts().filter((p) => p.featured);
export const getProductsByCategory = (categorySlug: string): Product[] =>
  getProducts().filter((p) => p.category === categorySlug);
export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
export const getRelatedProducts = (product: Product, limit = 3): Product[] =>
  getProducts()
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(getProducts().filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, limit);

export const getGalleryProjects = (): GalleryProject[] => [...galleryProjects].sort(byOrder);
export const getFeaturedGalleryProject = (): GalleryProject | undefined =>
  getGalleryProjects().find((p) => p.featured);
export const getGalleryProjectBySlug = (slug: string): GalleryProject | undefined =>
  galleryProjects.find((p) => p.slug === slug);

export const getTestimonials = (): Testimonial[] => [...testimonials].sort(byOrder);
