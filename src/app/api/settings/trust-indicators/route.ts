export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const trustIndicators = await db.trustIndicator.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(trustIndicators);
  } catch (error) {
    console.error('Error fetching trust indicators:', error);
    return NextResponse.json({ error: 'Failed to fetch trust indicators' }, { status: 500 });
  }
}
