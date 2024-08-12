import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const dailyRewardType = await prisma.bonusType.findFirst({
      where: {
        title: "daily_reward"
      }
    });

    if (dailyRewardType?.id) {
      const dailyRewards = await prisma.bonusSeting.findMany({
        where: {
          type: dailyRewardType.id
        },
        orderBy: {
          data: 'asc'
        }
      });

      const lastDailyRewards = await prisma.bonusHistory.findFirst({
        where: {
          type: dailyRewardType.id,
          userId: parseInt(userId)
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      if (lastDailyRewards) {
        return NextResponse.json({ dailyRewards, lastDailyRewards });
      }

      return NextResponse.json({ dailyRewards });
    }
    return NextResponse.json({ dailyRewards: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
