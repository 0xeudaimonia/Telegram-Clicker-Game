import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import { log } from 'console';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  
  const token = nanoid(8);


  try {
    const newReferralCode = await prisma.referralCode.create({
      data: {
        token,
        userId,
      },
    });

    log('New referral code created:', newReferralCode);

    console.log('New referral code created:', newReferralCode);
    return NextResponse.json(newReferralCode);
  } catch (error) {
    console.error('Error creating referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = Number(searchParams.get('userId'));

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const referralCode = await prisma.referralCode.findUnique({
      where: { id: user_id },
    });

    if (!referralCode) {
      return NextResponse.json({ error: 'Referral code not found' }, { status: 404 });
    }

    return NextResponse.json(referralCode);
  } catch (error) {
    console.error('Error retrieving referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}