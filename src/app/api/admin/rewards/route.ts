import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const rewards = await prisma.dailyReward.findMany();
    return NextResponse.json(rewards, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching rewards' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, points } = await req.json();
    const newReward = await prisma.dailyReward.create({
      data: { title, description, points }
    });
    return NextResponse.json(newReward, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating reward' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, points } = await req.json();
    const updatedReward = await prisma.dailyReward.update({
      where: { id },
      data: { title, description, points }
    });
    return NextResponse.json(updatedReward, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating reward' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.dailyReward.delete({
      where: { id }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting reward' }, { status: 500 });
  }
}
