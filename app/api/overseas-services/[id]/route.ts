import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const service = await prisma.overseasService.findUnique({
      where: { id },
    });
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Get overseas service error:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const service = await prisma.overseasService.update({
      where: { id },
      data: {
        name: data.name,
        nameEn: data.nameEn || null,
        nameTh: data.nameTh || null,
        nameVi: data.nameVi || null,
        icon: data.icon || null,
        gallery: data.gallery || null,
        description: data.description || null,
        descriptionEn: data.descriptionEn || null,
        descriptionTh: data.descriptionTh || null,
        descriptionVi: data.descriptionVi || null,
        content: data.content || null,
        contentEn: data.contentEn || null,
        contentTh: data.contentTh || null,
        contentVi: data.contentVi || null,
        advantages: data.advantages || null,
        advantagesEn: data.advantagesEn || null,
        advantagesTh: data.advantagesTh || null,
        advantagesVi: data.advantagesVi || null,
        sortOrder: data.sortOrder,
        status: data.status,
      },
    });
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Update overseas service error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.overseasService.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete overseas service error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
