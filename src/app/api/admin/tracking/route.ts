import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const trackingScripts = await db.trackingScript.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(trackingScripts);
  } catch (error) {
    console.error('Error fetching tracking scripts:', error);
    return NextResponse.json({ error: 'Failed to fetch tracking scripts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, script, isActive, position } = body;

    if (!name || !script) {
      return NextResponse.json({ error: 'Name and script are required' }, { status: 400 });
    }

    const trackingScript = await db.trackingScript.create({
      data: {
        name,
        script,
        isActive: isActive !== undefined ? isActive : true,
        position: position || 'head',
      },
    });

    return NextResponse.json(trackingScript, { status: 201 });
  } catch (error) {
    console.error('Error creating tracking script:', error);
    return NextResponse.json({ error: 'Failed to create tracking script' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, script, isActive, position } = body;

    if (!id) {
      return NextResponse.json({ error: 'Tracking script ID is required' }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (script !== undefined) data.script = script;
    if (isActive !== undefined) data.isActive = isActive;
    if (position !== undefined) data.position = position;

    const trackingScript = await db.trackingScript.update({
      where: { id },
      data,
    });

    return NextResponse.json(trackingScript);
  } catch (error) {
    console.error('Error updating tracking script:', error);
    return NextResponse.json({ error: 'Failed to update tracking script' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Tracking script ID is required' }, { status: 400 });
    }

    await db.trackingScript.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tracking script:', error);
    return NextResponse.json({ error: 'Failed to delete tracking script' }, { status: 500 });
  }
}
