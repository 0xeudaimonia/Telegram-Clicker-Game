import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const referralUsers = await prisma.user.findMany({
      where: {
        ReferralUser: {
          some: {
            referrerId: parseInt(userId),
          },
        },
      },
      select: {
        username: true,
      },
    });

    return NextResponse.json({ referralUsers });
  } catch (error) {
    console.error('Error fetching referral users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
