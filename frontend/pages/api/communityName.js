// pages/api/communityName.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { communityId } = req.query;

  if (!communityId) {
    return res.status(400).json({ error: 'communityId is required' });
  }

  const community = await prisma.community.findUnique({
    where: { id: communityId },
  });

  if (!community) {
    return res.status(404).json({ error: 'Community not found' });
  }

  res.status(200).json({ name: community.name });
}
