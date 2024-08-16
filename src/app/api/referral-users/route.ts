import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getUserAvatar from "@utils/getUserAvatar";
import user from '@app/admin/users/page';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const referralUsers = await prisma.user.findMany({
      where: {
        ReferralUser: {
          some: {
            referrerId: parseInt(userId),
          },
        },
      }
    });

    const refUsers = await Promise.all(referralUsers.map(async (element) => {
      const userAvataUrl = await getUserAvatar(element.telegramId);
      const result = await prisma.bonusHistory.findFirst({
        where: {
          userId: parseInt(userId),
          from: element.telegramId
        }
      });
      let bonus_points = result?.rewards ? result?.rewards : 0;
      return {
        username: element.username,
        id: Number(element.telegramId),
        avatar: userAvataUrl.url,
        bonus: bonus_points
      };
    }));

    // console.log("referralUsers", refUsers);

    return NextResponse.json({ refUsers });
  } catch (error) {
    console.error('Error fetching referral users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
