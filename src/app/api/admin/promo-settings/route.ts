import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const settings = await db.setting.findMany({
      where: { group: 'promo' },
    });

    const result: Record<string, string> = {};
    for (const s of settings) {
      result[s.key] = s.value;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching promo settings:', error);
    return NextResponse.json({ error: 'Failed to fetch promo settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await db.setting.upsert({
          where: { key },
          update: { value, group: 'promo' },
          create: { key, value, group: 'promo' },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating promo settings:', error);
    return NextResponse.json({ error: 'Failed to update promo settings' }, { status: 500 });
  }
}
