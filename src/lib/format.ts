export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural || `${singular}s`;
}

export function getStockStatus(stock: number): {
  label: string;
  variant: 'in-stock' | 'low-stock' | 'out-of-stock';
} {
  if (stock === 0) return { label: 'Out of Stock', variant: 'out-of-stock' };
  if (stock <= 10) return { label: `Only ${stock} left`, variant: 'low-stock' };
  return { label: 'In Stock', variant: 'in-stock' };
}

export function getDiscountPercent(price: number, compareAtPrice: number | null): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
