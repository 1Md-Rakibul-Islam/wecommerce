import fs from 'fs';
import path from 'path';
import { Product } from '@/types/product';

interface ProductIndexItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  tags: string[];
  createdAt: string;
}

interface CategoryInfo {
  name: string;
  count: number;
  brands: string[];
  subcategories: string[];
}

let cachedProducts: Product[] | null = null;
let cachedIndex: ProductIndexItem[] | null = null;
let cachedCategories: CategoryInfo[] | null = null;

function getDataDir(): string {
  return path.join(process.cwd(), 'public', 'data');
}

function loadProducts(): Product[] {
  if (cachedProducts) return cachedProducts;
  const filePath = path.join(getDataDir(), 'products.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  cachedProducts = JSON.parse(raw) as Product[];
  return cachedProducts;
}

function loadIndex(): ProductIndexItem[] {
  if (cachedIndex) return cachedIndex;
  const filePath = path.join(getDataDir(), 'products-index.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  cachedIndex = JSON.parse(raw) as ProductIndexItem[];
  return cachedIndex;
}

function loadCategories(): CategoryInfo[] {
  if (cachedCategories) return cachedCategories;
  const filePath = path.join(getDataDir(), 'categories.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  cachedCategories = JSON.parse(raw) as CategoryInfo[];
  return cachedCategories;
}

export function getAllProducts(): Product[] {
  return loadProducts();
}

export function getAllProductSlugs(): string[] {
  return loadIndex().map((p) => p.slug);
}

export function getProductBySlug(slug: string): Product | null {
  return getAllProducts().find((p) => p.slug === slug) || null;
}

export function getProductById(id: string): Product | null {
  return getAllProducts().find((p) => p.id === id) || null;
}

export function getRelatedProducts(product: Product, count: number = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 3;
      if (p.subcategory === product.subcategory) score += 2;
      if (p.brand === product.brand) score += 2;
      const sharedTags = p.tags.filter((t) => product.tags.includes(t)).length;
      score += sharedTags;
      const priceDiff = Math.abs(p.price - product.price) / Math.max(product.price, 1);
      if (priceDiff < 0.3) score += 1;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.product);
}

export function getCategories(): CategoryInfo[] {
  return loadCategories();
}
