export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
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
    return NextResponse.json({});
  }
}
