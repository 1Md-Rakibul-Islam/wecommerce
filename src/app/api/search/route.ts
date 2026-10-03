import { NextRequest, NextResponse } from 'next/server';
import { getSearchSuggestions } from '@/features/products/api/products';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  const suggestions = getSearchSuggestions(query, 8);
  return NextResponse.json(suggestions, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}
