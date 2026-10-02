import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env['NEXT_PUBLIC_BASE_URL'] || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const API_ENDPOINTS = {
  products: '/api/products',
  product: (slug: string) => `/api/products/${slug}`,
  related: (slug: string) => `/api/products/${slug}/related`,
  search: '/api/search',
} as const;
