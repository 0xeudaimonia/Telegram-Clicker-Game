// pages/api/saveScore.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function saveScore(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, score, level } = req.body;

    if (typeof userId !== 'number' || typeof score !== 'number' || typeof level !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    try {
      // Check if a game record for the user already exists
      const existingGame = await prisma.game.findUnique({
        where: { userId },
      });

      if (existingGame) {
        // Update the existing record
        const updatedGame = await prisma.game.update({
          where: { userId },
          data: {
            score: existingGame.score + score,
            level: level, 
          },
        });

        return res.status(200).json(updatedGame);
      } else {
        // Create a new game record if none exists
        const newGame = await prisma.game.create({
          data: {
            userId,
            score,
            level,
          },
        });

        return res.status(200).json(newGame);
      }
    } catch (error) {
      console.error('Error saving or updating score:', error);
      return res.status(500).json({ error: 'Error saving or updating score' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
