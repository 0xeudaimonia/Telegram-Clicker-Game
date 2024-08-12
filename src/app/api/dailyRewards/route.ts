import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const dailyRewards = await prisma.bonusSeting.findMany({ orderBy: { type: 'asc' } });
    return NextResponse.json({ dailyRewards });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
