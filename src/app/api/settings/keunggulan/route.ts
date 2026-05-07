export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const keunggulan = await db.keunggulan.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(keunggulan);
  } catch (error) {
    console.error('Error fetching keunggulan:', error);
    return NextResponse.json({ error: 'Failed to fetch keunggulan' }, { status: 500 });
  }
}
