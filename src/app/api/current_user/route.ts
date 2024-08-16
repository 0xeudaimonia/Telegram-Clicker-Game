import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getUserAvatar from "@utils/getUserAvatar";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  
  const telegramUserId = req.nextUrl.searchParams.get('telegramUserId');

  if (!telegramUserId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // const referralCode = `r_${telegramUserId}`
    const user = await prisma.user.findUnique({
      where: {
        telegramId: telegramUserId
      },
    });

    if (user) {

      const avataInfo = await getUserAvatar(telegramUserId);

      return NextResponse.json({ userName: user.username, userId: user.id, referralCode: user.referralCode, avatar: avataInfo.url });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}