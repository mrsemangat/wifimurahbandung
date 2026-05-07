import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const keunggulan = await db.keunggulan.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(keunggulan);
  } catch (error) {
    console.error('Error fetching keunggulan:', error);
    return NextResponse.json({ error: 'Failed to fetch keunggulan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { icon, title, desc, isActive, order } = body;

    if (!icon || !title) {
      return NextResponse.json({ error: 'Icon and title are required' }, { status: 400 });
    }

    const keunggulan = await db.keunggulan.create({
      data: {
        icon,
        title,
        desc: desc || null,
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0,
      },
    });

    return NextResponse.json(keunggulan, { status: 201 });
  } catch (error) {
    console.error('Error creating keunggulan:', error);
    return NextResponse.json({ error: 'Failed to create keunggulan' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, icon, title, desc, isActive, order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Keunggulan ID is required' }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (icon !== undefined) data.icon = icon;
    if (title !== undefined) data.title = title;
    if (desc !== undefined) data.desc = desc;
    if (isActive !== undefined) data.isActive = isActive;
    if (order !== undefined) data.order = order;

    const keunggulan = await db.keunggulan.update({
      where: { id },
      data,
    });

    return NextResponse.json(keunggulan);
  } catch (error) {
    console.error('Error updating keunggulan:', error);
    return NextResponse.json({ error: 'Failed to update keunggulan' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Keunggulan ID is required' }, { status: 400 });
    }

    await db.keunggulan.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting keunggulan:', error);
    return NextResponse.json({ error: 'Failed to delete keunggulan' }, { status: 500 });
  }
}
