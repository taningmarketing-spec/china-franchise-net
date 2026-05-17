import { prisma } from '@/lib/prisma';

export interface OverseasService {
  id: string;
  serviceId: string;
  name: string;
  nameEn: string | null;
  nameTh: string | null;
  nameVi: string | null;
  icon: string | null;
  gallery: string | null;
  description: string | null;
  descriptionEn: string | null;
  descriptionTh: string | null;
  descriptionVi: string | null;
  content: string | null;
  contentEn: string | null;
  contentTh: string | null;
  contentVi: string | null;
  advantages: string | null;
  advantagesEn: string | null;
  advantagesTh: string | null;
  advantagesVi: string | null;
  sortOrder: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getOverseasServices(): Promise<OverseasService[]> {
  const services = await prisma.overseasService.findMany({
    where: { status: 'active' },
    orderBy: { sortOrder: 'asc' },
  });
  return services;
}

export async function getOverseasService(serviceId: string): Promise<OverseasService | null> {
  const service = await prisma.overseasService.findFirst({
    where: { serviceId, status: 'active' },
  });
  return service;
}
