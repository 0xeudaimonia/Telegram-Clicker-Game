import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // const { userId } = await req.json();

    // if (!userId) {
    //   return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    // }

    // // Fetch the user's telegramId
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (!user) {
    //   return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // }

    // // Generate the referral token
    // const token = `r_${user.telegramId}`;

    // // Create the new referral code in the database
    // const newReferralCode = await prisma.referralCode.create({
    //   data: {
    //     token,
    //     userId,
    //   },
    // });

    // return NextResponse.json(newReferralCode);
  } catch (error) {
    console.error('Error creating referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = Number(searchParams.get('user_id'));

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // const referralCode = await prisma.referralCode.findFirstOrThrow({
    //   where: { userId: user_id },
    // });

    // if (!referralCode) {
    //   return NextResponse.json({ error: 'Referral code not found' }, { status: 404 });
    // }

    // return NextResponse.json(referralCode);
  } catch (error) {
    console.error('Error retrieving referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
