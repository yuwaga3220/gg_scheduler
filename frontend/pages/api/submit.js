// pages/api/submit.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { communityId, name, times, date } = req.body;

    if (!communityId || !name || !Array.isArray(times) || !date) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    try {
      // ✅ 既存エントリがあるか確認
      const existingEntry = await prisma.scheduleEntry.findFirst({
        where: {
          userName: name,
          communityId,
          date,
        },
      });

      if (existingEntry) {
        // 更新
        await prisma.scheduleEntry.update({
          where: { id: existingEntry.id },
          data: { timeSlots: JSON.stringify(times) },
        });
      } else {
        // 新規作成
        await prisma.scheduleEntry.create({
          data: {
            userName: name,
            communityId,
            date,
            timeSlots: JSON.stringify(times),
          },
        });
      }

      return res.status(200).json({ message: 'Saved to DB' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'DB error' });
    }
  }

  // ✅ デバッグ用 GET
  if (req.method === 'GET') {
    const all = await prisma.scheduleEntry.findMany();
    return res.status(200).json(all);
  }

  return res.status(405).end();
}