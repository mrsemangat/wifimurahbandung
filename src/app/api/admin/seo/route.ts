import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const seoSettings = await db.seoSetting.findMany();

    return NextResponse.json(seoSettings);
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, metaTitle, metaDesc, focusKeyword, ogImage, canonicalUrl } = body;

    if (!page) {
      return NextResponse.json({ error: 'Page identifier is required' }, { status: 400 });
    }

    const seoSetting = await db.seoSetting.upsert({
      where: { page },
      update: {
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        focusKeyword: focusKeyword || null,
        ogImage: ogImage || null,
        canonicalUrl: canonicalUrl || null,
      },
      create: {
        page,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        focusKeyword: focusKeyword || null,
        ogImage: ogImage || null,
        canonicalUrl: canonicalUrl || null,
      },
    });

    return NextResponse.json(seoSetting);
  } catch (error) {
    console.error('Error updating SEO setting:', error);
    return NextResponse.json({ error: 'Failed to update SEO setting' }, { status: 500 });
  }
}
