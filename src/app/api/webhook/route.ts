import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (message) {
      const telegramId = message.from.id;
      const username = `${message.from.first_name} ${message.from.last_name}` || message.from.username;
      const referralCode = `r_${telegramId}`;
      const referrerCode = message.text.split(' ')[1]; // Assuming the referral code is sent as part of the message text

      const existingUser = await prisma.user.findUnique({
        where: { telegramId },
      });

      if (!existingUser) {
        const referrer = await prisma.user.findUnique({
          where: { referralCode: referrerCode },
        });

        const user = await prisma.user.create({
          data: {
            telegramId,
            username,
            referralCode,
            ReferralUser: {
              create: {
                referrerId: referrer ? referrer.id : null,
              },
            },
          },
        });

        // Send a welcome message
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: telegramId,
          text: 'Welcome to our service! Your account has been created.',
        });
      } else {
        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: {
                username,
            },
            });

        // Send a message if user already exists
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: telegramId,
          text: 'You are already registered.',
        });
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
