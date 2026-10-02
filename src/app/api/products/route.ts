import { NextRequest, NextResponse } from 'next/server';
import { getProducts, ProductNotFoundError } from '@/lib/api/products';
import { ProductFilters, SortOption } from '@/types/product';

export const dynamic = 'force-dynamic';

function parseNumberParam(value: string | null): number | undefined {
  if (!value) return undefined;
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}

function parseArrayParam(value: string | null): string[] | undefined {
  if (!value) return undefined;
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const filters: ProductFilters = {
      search: params.get('search') || undefined,
      category: params.get('category') || undefined,
      subcategory: params.get('subcategory') || undefined,
      brand: params.get('brand') || undefined,
      minPrice: parseNumberParam(params.get('minPrice')),
      maxPrice: parseNumberParam(params.get('maxPrice')),
      minRating: parseNumberParam(params.get('minRating')),
      tags: parseArrayParam(params.get('tags')),
      sort: (params.get('sort') as SortOption) || undefined,
      page: parseNumberParam(params.get('page')),
      limit: parseNumberParam(params.get('limit')),
    };

    const result = getProducts(filters);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
