'use strict'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const pages = await prisma.cmsPage.findMany({
    select: { slug: true, locale: true, title: true, status: true },
    orderBy: { slug: 'asc' }
  })
  console.log(JSON.stringify(pages, null, 2))
}

main().finally(() => prisma.$disconnect())
