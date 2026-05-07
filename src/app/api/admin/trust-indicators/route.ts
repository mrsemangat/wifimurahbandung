import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const trustIndicators = await db.trustIndicator.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(trustIndicators);
  } catch (error) {
    console.error('Error fetching trust indicators:', error);
    return NextResponse.json({ error: 'Failed to fetch trust indicators' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { icon, value, label, isActive, order } = body;

    if (!icon || !value || !label) {
      return NextResponse.json({ error: 'Icon, value, and label are required' }, { status: 400 });
    }

    const trustIndicator = await db.trustIndicator.create({
      data: {
        icon,
        value,
        label,
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0,
      },
    });

    return NextResponse.json(trustIndicator, { status: 201 });
  } catch (error) {
    console.error('Error creating trust indicator:', error);
    return NextResponse.json({ error: 'Failed to create trust indicator' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, icon, value, label, isActive, order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Trust indicator ID is required' }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (icon !== undefined) data.icon = icon;
    if (value !== undefined) data.value = value;
    if (label !== undefined) data.label = label;
    if (isActive !== undefined) data.isActive = isActive;
    if (order !== undefined) data.order = order;

    const trustIndicator = await db.trustIndicator.update({
      where: { id },
      data,
    });

    return NextResponse.json(trustIndicator);
  } catch (error) {
    console.error('Error updating trust indicator:', error);
    return NextResponse.json({ error: 'Failed to update trust indicator' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Trust indicator ID is required' }, { status: 400 });
    }

    await db.trustIndicator.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting trust indicator:', error);
    return NextResponse.json({ error: 'Failed to delete trust indicator' }, { status: 500 });
  }
}
