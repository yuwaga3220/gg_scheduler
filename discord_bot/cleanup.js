const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 毎日 AM3:15（JST）に実行。
// ※Vercel/Render など UTC 環境なら '15 18 * * *' にするなど調整（JST=UTC+9）
cron.schedule('15 3 * * *', async () => {
  try {
    // 3日前の 00:00 を境界にする
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 3);
    threshold.setHours(0, 0, 0, 0);

    const { count } = await prisma.scheduleEntry.deleteMany({
      where: {
        date: { lt: threshold },
      },
    });

    console.log(`[cleanup] ${count} scheduleEntries deleted (before ${threshold.toISOString()})`);
  } catch (err) {
    console.error('[cleanup] failed:', err);
  } finally {
    await prisma.$disconnect();
  }
});
