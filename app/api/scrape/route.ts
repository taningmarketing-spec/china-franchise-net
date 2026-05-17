import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 触发采集（供 cron 或手动调用）
export async function POST() {
  try {
    // 简单保护：生产环境应加入认证
    // if (req.headers.get('x-cron-secret') !== process.env.CRON_SECRET) return 401;

    // 在实际服务器上运行：node scripts/daily-scrape.ts
    // 这里简单记录一个待执行日志
    const log = await prisma.scrapeLog.create({
      data: {
        brandsCount: 0,
        status: 'triggered',
        message: '采集任务已触发（通过 API），将在后台执行',
      },
    });

    // 注意：真实采集需要单独执行脚本
    // 此处仅记录日志，实际采集需在服务器上运行：
    // cd /path/to/project && npm run scrape

    return NextResponse.json({
      success: true,
      message: '采集任务已触发',
      logId: log.id,
      note: '请在服务器上运行 npm run scrape 执行实际采集',
    });
  } catch (e) {
    return NextResponse.json({ error: 'Trigger failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const logsOnly = searchParams.get('logs') === 'true';

    if (logsOnly) {
      const logs = await prisma.scrapeLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      return NextResponse.json({ logs });
    }

    return NextResponse.json({ message: 'POST to trigger scrape, GET ?logs=true for log list' });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
