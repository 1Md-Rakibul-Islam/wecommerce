import {
  Product,
  ProductFilters,
  PaginatedProducts,
  Facets,
  FacetValue,
  SortOption,
} from '@/types/product';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/lib/products-data';

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 60;

export class ProductNotFoundError extends Error {
  constructor(slug: string) {
    super(`Product not found: ${slug}`);
    this.name = 'ProductNotFoundError';
  }
}

function parseSort(sort?: string): SortOption {
  const validSorts: SortOption[] = [
    'relevance',
    'price-asc',
    'price-desc',
    'rating-desc',
    'newest',
    'name-asc',
    'name-desc',
  ];
  if (sort && validSorts.includes(sort as SortOption)) {
    return sort as SortOption;
  }
  return 'relevance';
}

function applySorting(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }
}

function applyFilters(products: Product[], filters: ProductFilters, ignoreCategory = false, ignoreBrand = false, ignorePrice = false): Product[] {
  return products.filter((p) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    
    if (!ignoreCategory && filters.category && filters.category.length > 0) {
      if (typeof filters.category === 'string') {
        if (p.category !== filters.category) return false;
      } else if (Array.isArray(filters.category) && !filters.category.includes(p.category)) {
        return false;
      }
    }
    
    if (filters.subcategory && p.subcategory !== filters.subcategory) return false;
    
    if (!ignoreBrand && filters.brand && filters.brand.length > 0) {
      if (typeof filters.brand === 'string') {
        if (p.brand !== filters.brand) return false;
      } else if (Array.isArray(filters.brand) && !filters.brand.includes(p.brand)) {
        return false;
      }
    }
    
    if (!ignorePrice) {
      if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    }
    
    if (filters.rating) {
      const roundedRating = Math.floor(p.rating);
      if (Array.isArray(filters.rating)) {
        if (!filters.rating.includes(roundedRating)) return false;
      } else {
        if (roundedRating !== filters.rating) return false;
      }
    }
    if (filters.tags && filters.tags.length > 0) {
      if (!filters.tags.every((tag) => p.tags.includes(tag))) return false;
    }
    return true;
  });
}

function computeFacetValues(products: Product[], field: 'category' | 'brand' | 'tags'): FacetValue[] {
  const map = new Map<string, number>();
  for (const p of products) {
    if (field === 'tags') {
      for (const tag of p.tags) {
        map.set(tag, (map.get(tag) || 0) + 1);
      }
    } else {
      const val = p[field];
      map.set(val, (map.get(val) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

export interface ProductsResult extends PaginatedProducts {
  facets: Facets;
}

export function getProducts(filters: ProductFilters = {}): ProductsResult {
  const allProducts = getAllProducts();
  const page = Math.max(1, filters.page || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, filters.limit || DEFAULT_LIMIT));
  const sort = parseSort(filters.sort);

  const filtered = applyFilters(allProducts, filters);
  const sorted = applySorting(filtered, sort);
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const start = (safePage - 1) * limit;
  const paged = sorted.slice(start, start + limit);

  // Compute facets properly (ignoring the filter itself for its own facet so checkboxes don't disappear)
  const categoryProducts = applyFilters(allProducts, filters, true, false, false);
  const brandProducts = applyFilters(allProducts, filters, false, true, false);
  const priceProducts = applyFilters(allProducts, filters, false, false, true);

  const prices = priceProducts.map((p) => p.price);

  const facets: Facets = {
    categories: computeFacetValues(categoryProducts, 'category'),
    brands: computeFacetValues(brandProducts, 'brand'),
    tags: computeFacetValues(filtered, 'tags'), // tags can be based on final filtered set
    priceRange: {
      min: prices.length ? Math.floor(Math.min(...prices)) : 0,
      max: prices.length ? Math.ceil(Math.max(...prices)) : 1000,
    },
  };

  return {
    products: paged,
    total,
    page: safePage,
    limit,
    totalPages,
    hasMore: safePage < totalPages,
    facets,
  };
}

export function getProduct(slug: string): Product {
  const product = getProductBySlug(slug);
  if (!product) {
    throw new ProductNotFoundError(slug);
  }
  return product;
}

export function getRelated(slug: string, count: number = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return getRelatedProducts(product, count);
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  label: string;
  slug?: string;
}

export function getSearchSuggestions(query: string, limit: number = 8): SearchSuggestion[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const all = getAllProducts();
  const suggestions: SearchSuggestion[] = [];

  const seenProducts = new Set<string>();
  for (const p of all) {
    if (p.name.toLowerCase().includes(q) && !seenProducts.has(p.slug)) {
      suggestions.push({ type: 'product', label: p.name, slug: p.slug });
      seenProducts.add(p.slug);
    }
    if (suggestions.length >= limit) break;
  }

  const seenCats = new Set<string>();
  for (const p of all) {
    if (p.category.toLowerCase().includes(q) && !seenCats.has(p.category)) {
      suggestions.push({ type: 'category', label: p.category });
      seenCats.add(p.category);
    }
    if (suggestions.length >= limit) break;
  }

  const seenBrands = new Set<string>();
  for (const p of all) {
    if (p.brand.toLowerCase().includes(q) && !seenBrands.has(p.brand)) {
      suggestions.push({ type: 'brand', label: p.brand });
      seenBrands.add(p.brand);
    }
    if (suggestions.length >= limit) break;
  }

  return suggestions.slice(0, limit);
}
