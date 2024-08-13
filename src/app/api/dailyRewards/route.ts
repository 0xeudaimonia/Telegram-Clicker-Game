import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface bonusSettingType {
  id: Number;
  type: Number;
  data: String;
  points: Number;
  createdAt: Date;
  updatedAt: Date;
};

interface bonusHistoryType {
  id: Number;
  type: Number;
  userId: Number;
  from: String;
  rewards: Number;
  createdAt: Date;
  updatedAt: Date;
};

const ALREADY_GOT_REWARDS = -1;

const getDailyRewardIndex = (dailyRewards: bonusSettingType[], lastDailyRewards: bonusHistoryType) => {
  const currentDate = new Date();
  const lastDate = lastDailyRewards.createdAt;
  const nextDay = new Date(lastDate);
  nextDay.setDate(lastDate.getDate() + 1);

  let dailyIndex = 0;

  dailyIndex = dailyRewards.findIndex(element => element.data === lastDailyRewards.from);

  if (nextDay.getDate() > currentDate.getDate()) {
    return ALREADY_GOT_REWARDS;
  } else if (nextDay.getDate() == currentDate.getDate()) {
    dailyIndex = dailyRewards.findIndex(element => element.data === lastDailyRewards.from);
    if (dailyIndex >= dailyRewards.length - 1) {
      dailyIndex = dailyRewards.length - 1;
    } else {
      dailyIndex++;
    }
  }

  return dailyIndex;
}

export async function GET(req: NextRequest) {

  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Отсутствующий'}, { status: 400 });
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

      let dailyIndex = 0;
      if (lastDailyRewards) {
        dailyIndex = getDailyRewardIndex(dailyRewards, lastDailyRewards);
      }

      return NextResponse.json({ dailyRewards, dailyIndex });
    }
    return NextResponse.json({ error: "В базе данных нет ежедневной обработки вознаграждений"});
  } catch (error) {
    return NextResponse.json({ error: 'Внутренняя ошибка сервера'}, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    //
    const body = await req.json();
    // console.log('Request body:', body);
    const { userId } = body;

    let result;

    if (!userId) {
      return NextResponse.json({ error: 'Отсутствующий' }, { status: 400 });
    }

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

      let dailyIndex = 0;

      if (lastDailyRewards) {
        dailyIndex = getDailyRewardIndex(dailyRewards, lastDailyRewards);
        if (dailyIndex == ALREADY_GOT_REWARDS) {
          return NextResponse.json({ error: "Уже получил сегодняшние награды" }, { status: 400 });
        }
      }

      result = await prisma.bonusHistory.create({
        data: {
          type: dailyRewardType.id,
          userId: userId,
          from: dailyRewards[dailyIndex].data,
          rewards: dailyRewards[dailyIndex].points
        },
      });

      // Check if a game record for the user already exists
      const existingGame = await prisma.game.findFirst({
        where: { userId },
      });

      if (existingGame) {
        // Update the existing record
        result = await prisma.game.update({
          where: { id: existingGame.id },
          data: {
            points: existingGame.points + dailyRewards[dailyIndex].points
          },
        });
      } else {
        result = await prisma.game.create({
          data: {
            userId: userId,
            score: 0,
            level: 1,
            points: dailyRewards[dailyIndex].points,
          },
        });
      }

      return NextResponse.json({
        message: "Успешно получил сегодняшние награды",
        data: {
          type: dailyRewardType.id,
          userId: userId,
          from: dailyRewards[dailyIndex].data,
          rewards: dailyRewards[dailyIndex].points
        }
      });
    }
    return NextResponse.json({ error: 'Отсутствуют обязательные поля в базе данных' }, { status: 400 });
  } catch (error) {
    // console.error('Error saving or updating score:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Неверный JSON' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
