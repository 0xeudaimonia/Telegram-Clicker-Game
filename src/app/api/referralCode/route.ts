import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  // Generate a unique referral code
  const token = nanoid(8);

  try {
    const newreferralCode = await prisma.referralCode.create({
      data: {
        token,
        userId,
      },
    });
    return NextResponse.json(newreferralCode);
  } catch (error) {
    console.error('Error creating referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const referralCode = await prisma.referralCode.findUnique({
      where: { id: parseInt(userId) },
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
