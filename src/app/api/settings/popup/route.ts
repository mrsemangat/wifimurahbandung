export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const popup = await db.popup.findFirst({
      where: { isActive: true },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error('Error fetching popup:', error);
    return NextResponse.json({ error: 'Failed to fetch popup' }, { status: 500 });
  }
}
