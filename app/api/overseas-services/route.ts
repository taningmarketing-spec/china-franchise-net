import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }
    
    const services = await prisma.overseasService.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
    
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Overseas services API error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.serviceId || !data.name) {
      return NextResponse.json({ error: 'serviceId and name are required' }, { status: 400 });
    }
    
    // Check if serviceId already exists
    const existing = await prisma.overseasService.findUnique({
      where: { serviceId: data.serviceId },
    });
    
    if (existing) {
      return NextResponse.json({ error: 'serviceId already exists' }, { status: 400 });
    }
    
    const service = await prisma.overseasService.create({
      data: {
        serviceId: data.serviceId,
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
        sortOrder: data.sortOrder || 0,
        status: data.status || 'active',
      },
    });
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Create overseas service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
