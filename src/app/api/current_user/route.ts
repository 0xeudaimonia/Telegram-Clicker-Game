import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const telegramUserId = req.nextUrl.searchParams.get('telegramUserId');

  if (!telegramUserId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const referralCode = `r_${telegramUserId}`
    const user = await prisma.user.upsert({
      where: { telegramId: telegramUserId },
      create: {
        referralCode,
        telegramId: telegramUserId
      },
      update: {
        referralCode,
        telegramId: telegramUserId
      }
    });

    if (user) {
      return NextResponse.json({ userName: user.username, userId: user.id, referralCode: user.referralCode });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}