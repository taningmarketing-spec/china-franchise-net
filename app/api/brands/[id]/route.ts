import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PATCH: toggle isHot
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { isHot } = body;
    const brand = await prisma.brand.update({
      where: { id: params.id },
      data: { isHot: Boolean(isHot) },
    });
    return NextResponse.json({ brand });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
