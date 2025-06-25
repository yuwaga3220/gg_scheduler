// pages/api/registerCommunity.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, webhook } = req.body;

  if (!name || !webhook) {
    return res.status(400).json({ error: 'name and webhook are required' });
  }

  try {
    const community = await prisma.community.create({
      data: { name, webhook },
    });

    res.status(200).json({ id: community.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'DB error' });
  }
}
