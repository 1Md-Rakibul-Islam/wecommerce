import { ProductFilters, SortOption } from '@/types/product';

export interface UrlFilters {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  tags?: string;
  sort?: SortOption;
  page?: string;
}

export const SORT_LABELS: Record<SortOption, string> = {
  relevance: 'Relevance',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'rating-desc': 'Highest Rated',
  newest: 'Newest Arrivals',
  'name-asc': 'Name: A to Z',
  'name-desc': 'Name: Z to A',
};

export const SORT_OPTIONS = Object.keys(SORT_LABELS) as SortOption[];

export function filtersToParams(filters: ProductFilters): Record<string, string> {
  const params: Record<string, string> = {};
  if (filters.search) params.search = filters.search;
  if (filters.category) params.category = filters.category;
  if (filters.subcategory) params.subcategory = filters.subcategory;
  if (filters.brand) params.brand = filters.brand;
  if (filters.minPrice !== undefined) params.minPrice = String(filters.minPrice);
  if (filters.maxPrice !== undefined) params.maxPrice = String(filters.maxPrice);
  if (filters.minRating !== undefined) params.minRating = String(filters.minRating);
  if (filters.tags && filters.tags.length > 0) params.tags = filters.tags.join(',');
  if (filters.sort && filters.sort !== 'relevance') params.sort = filters.sort;
  if (filters.page && filters.page > 1) params.page = String(filters.page);
  return params;
}

export function paramsToFilters(params: URLSearchParams): ProductFilters {
  const filters: ProductFilters = {};
  const search = params.get('search');
  if (search) filters.search = search;
  const category = params.get('category');
  if (category) filters.category = category;
  const subcategory = params.get('subcategory');
  if (subcategory) filters.subcategory = subcategory;
  const brand = params.get('brand');
  if (brand) filters.brand = brand;
  const minPrice = params.get('minPrice');
  if (minPrice) filters.minPrice = Number(minPrice);
  const maxPrice = params.get('maxPrice');
  if (maxPrice) filters.maxPrice = Number(maxPrice);
  const minRating = params.get('minRating');
  if (minRating) filters.minRating = Number(minRating);
  const tags = params.get('tags');
  if (tags) filters.tags = tags.split(',').map((t) => t.trim()).filter(Boolean);
  const sort = params.get('sort');
  if (sort) filters.sort = sort as SortOption;
  const page = params.get('page');
  if (page) filters.page = Number(page);
  return filters;
}

export function buildFilterUrl(
  currentParams: URLSearchParams,
  updates: Partial<UrlFilters>,
): string {
  const params = new URLSearchParams(currentParams.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === '' || value === null) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  }

  if (!updates.page && (updates.category !== undefined || updates.brand !== undefined || updates.minPrice !== undefined || updates.maxPrice !== undefined || updates.minRating !== undefined || updates.tags !== undefined || updates.search !== undefined || updates.sort !== undefined)) {
    params.delete('page');
  }

  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : '/shop';
}

export function hasActiveFilters(params: URLSearchParams): boolean {
  return (
    params.has('search') ||
    params.has('category') ||
    params.has('subcategory') ||
    params.has('brand') ||
    params.has('minPrice') ||
    params.has('maxPrice') ||
    params.has('minRating') ||
    params.has('tags')
  );
}

export function clearFiltersUrl(): string {
  return '/shop';
}
