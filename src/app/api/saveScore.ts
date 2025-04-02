import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function saveScore(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, score, level } = req.body;

    try {
      const newScore = await prisma.game.create({
        data: {
          userId,
          score,
          level,
        },
      });

      res.status(200).json(newScore);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка сохранения результата' });
    }
  } else {
    res.status(405).json({ error: 'Метод не разрешен' });
  }
}
