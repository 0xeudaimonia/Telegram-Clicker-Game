import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber)) {
    return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
  }
  
  try {
    const game = await prisma.game.findFirst({
      where: { userId: userIdNumber },
    });

    const points = game ? game.points : 0;

    return NextResponse.json({ points }, { status: 200 });
  } catch (error) {
    console.error('Error fetching game points:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
