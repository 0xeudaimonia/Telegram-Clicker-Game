import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { userId, score, level, points } = body;

    if (!userId || !score || !level || !points) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if a game record for the user already exists
    const existingGame = await prisma.game.findFirst({
      where: { userId },
    });

    let result;
    if (existingGame) {
      // Update the existing record
      result = await prisma.game.update({
        where: { id: existingGame.id },
        data: {
          score: existingGame.score + score,
          points: existingGame.points + points,
          level,
        },
      });
    } else {
      result = await prisma.game.create({
        data: {
          userId: userId,
          score: score,
          level: level,
          points: points,
        },
      });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error saving or updating score:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}