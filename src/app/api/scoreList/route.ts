import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getUserAvatar from "@utils/getUserAvatar";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.game.findMany({
      orderBy: {
        points: 'desc'
      },
      take: 10
    });

    const userScores = await Promise.all(users.map(async (element) => {
      const user = await prisma.user.findUnique({
        where: {
          id: element.userId
        }
      });
      let userAvataUrl;
      if (user) {
        userAvataUrl = await getUserAvatar(user.telegramId);
        return {
          title: user.username,
          imageSrc: userAvataUrl?.url,
          points: element.points
        };
      }
    }));

    if (users) {
      return NextResponse.json({ userScores });
    } else {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}