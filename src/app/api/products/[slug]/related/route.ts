import { NextRequest, NextResponse } from 'next/server';
import { getRelated, ProductNotFoundError } from '@/lib/api/products';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> },
) {
  try {
    const params = await props.params;
    const related = getRelated(params.slug, 4);
    return NextResponse.json(related, {
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
