export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  reviews: Review[];
  tags: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  tags?: string[];
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'newest'
  | 'name-asc'
  | 'name-desc';

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface FacetValue {
  value: string;
  count: number;
}

export interface Facets {
  categories: FacetValue[];
  brands: FacetValue[];
  tags: FacetValue[];
  priceRange: { min: number; max: number };
}
