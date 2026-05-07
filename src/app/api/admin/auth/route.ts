export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@netlify/database';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Tidak terautentikasi' },
        { status: 401 }
      );
    }

    // Simple token: base64 encoded userId
    const token = authHeader.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString('utf-8');

    const db = getDatabase();
    const result = await db.sql`SELECT id, email, name, role FROM users WHERE id = ${userId}`;
    const user = result[0];

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Tidak terautentikasi' },
      { status: 401 }
    );
  }
}
