'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient, API_ENDPOINTS } from '@/lib/api-client';
import { Product, PaginatedProducts } from '@/types/product';
import type { ProductsResult } from '@/features/products/api/products';

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  label: string;
  slug?: string;
}

// CSR: Fetch related products client-side with TanStack Query
export function useRelatedProducts(slug: string, enabled: boolean = true) {
  return useQuery<Product[]>({
    queryKey: ['related-products', slug],
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>(
        API_ENDPOINTS.related(slug),
      );
      return data;
    },
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

// CSR: Fetch search suggestions with TanStack Query (debounced via enabled flag)
export function useSearchSuggestions(query: string, enabled: boolean = true) {
  return useQuery<SearchSuggestion[]>({
    queryKey: ['search-suggestions', query],
    queryFn: async () => {
      const { data } = await apiClient.get<SearchSuggestion[]>(
        API_ENDPOINTS.search,
        { params: { q: query } },
      );
      return data;
    },
    enabled: enabled && query.trim().length >= 2,
    staleTime: 30 * 1000,
  });
}

// CSR: Fetch products client-side (for client-side pagination/filter changes)
export function useProductsClient(params: Record<string, string | number | undefined>) {
  const cleanParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      cleanParams[key] = String(value);
    }
  }

  return useQuery<ProductsResult>({
    queryKey: ['products', cleanParams],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductsResult>(
        API_ENDPOINTS.products,
        { params: cleanParams },
      );
      return data;
    },
    staleTime: 60 * 1000,
  });
}

// CSR: Fetch single product client-side
export function useProductClient(slug: string, enabled: boolean = true) {
  return useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await apiClient.get<Product>(API_ENDPOINTS.product(slug));
      return data;
    },
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
