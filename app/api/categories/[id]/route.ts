import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single category
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cat = await prisma.category.findUnique({ where: { id: params.id } });
    if (!cat) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json({ category: cat });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Update category
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Get old category data
    const oldCat = await prisma.category.findUnique({ where: { id: params.id } });
    if (!oldCat) {
      return NextResponse.json({ error: '分类不存在' }, { status: 404 });
    }

    const body = await req.json();
    const { name, slug, icon, color, desc } = body;

    // 2. Update category
    const cat = await prisma.category.update({
      where: { id: params.id },
      data: { name, slug, icon, color, desc },
    });

    // 3. Sync industry field on all brands in this category
    //    When category name changes, update brand.industry to match new name
    if (name && name !== oldCat.name) {
      // Get old slug (might have changed too)
      const effectiveSlug = slug || oldCat.slug;
      
      await prisma.brand.updateMany({
        where: { categorySlug: effectiveSlug },
        data: { industry: name },
      });
    }

    // 4. If slug changed, also update brand.categorySlug
    if (slug && slug !== oldCat.slug) {
      await prisma.brand.updateMany({
        where: { categorySlug: oldCat.slug },
        data: { categorySlug: slug },
      });
    }

    return NextResponse.json({ category: cat });
  } catch (e: any) {
    // Unique constraint on slug
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug 已存在' }, { status: 409 });
    }
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

// Delete category
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if any brand uses this category
    const count = await prisma.brand.count({ where: { categorySlug: params.id } });
    if (count > 0) {
      return NextResponse.json(
        { error: `该分类下还有 ${count} 个品牌，无法删除` },
        { status: 400 },
      );
    }

    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return NextResponse.json({ error: '分类不存在' }, { status: 404 });
    }
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
