import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const popups = await db.popup.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(popups);
  } catch (error) {
    console.error('Error fetching popups:', error);
    return NextResponse.json({ error: 'Failed to fetch popups' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, subtitle, ctaText, ctaUrl, isActive, delay, scrollPos, showOnce } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const popup = await db.popup.create({
      data: {
        type: type || 'delay',
        title,
        subtitle: subtitle || null,
        ctaText: ctaText || null,
        ctaUrl: ctaUrl || null,
        isActive: isActive !== undefined ? isActive : true,
        delay: delay || 5,
        scrollPos: scrollPos || 50,
        showOnce: showOnce !== undefined ? showOnce : true,
      },
    });

    return NextResponse.json(popup, { status: 201 });
  } catch (error) {
    console.error('Error creating popup:', error);
    return NextResponse.json({ error: 'Failed to create popup' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, type, title, subtitle, ctaText, ctaUrl, isActive, delay, scrollPos, showOnce } = body;

    if (!id) {
      return NextResponse.json({ error: 'Popup ID is required' }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (type !== undefined) data.type = type;
    if (title !== undefined) data.title = title;
    if (subtitle !== undefined) data.subtitle = subtitle;
    if (ctaText !== undefined) data.ctaText = ctaText;
    if (ctaUrl !== undefined) data.ctaUrl = ctaUrl;
    if (isActive !== undefined) data.isActive = isActive;
    if (delay !== undefined) data.delay = delay;
    if (scrollPos !== undefined) data.scrollPos = scrollPos;
    if (showOnce !== undefined) data.showOnce = showOnce;

    const popup = await db.popup.update({
      where: { id },
      data,
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error('Error updating popup:', error);
    return NextResponse.json({ error: 'Failed to update popup' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Popup ID is required' }, { status: 400 });
    }

    await db.popup.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting popup:', error);
    return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 });
  }
}
