import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    // console.log("message", message);

    if (message) {
      const telegramId = String(message.from.id);
      const username = `${message.from.first_name ? message.from.first_name : ''} ${message.from.last_name ? message.from.last_name : ''}` || message.from.username;
      const referralCode = `r_${telegramId}`;
      let referrerCode;

      if (message.text) {
        const messageParts = message.text.split(' ');
        if (messageParts.length > 1) {
          referrerCode = messageParts[1];
        }
      }

      const existingUser = await prisma.user.findUnique({
        where: { 
          telegramId: telegramId
        },
      });

      if (!existingUser) {
        let referrer = null;
        if (referrerCode) {
          referrer = await prisma.user.findUnique({
            where: { referralCode: referrerCode },
          });

          if (referrer) {
            const bonus_type = await prisma.bonusType.findFirst({
              where: {
                title: "invite_friend",
              }
            });

            let invite_record;

            if (bonus_type?.id) {
              invite_record = await prisma.bonusSeting.findFirst({
                where: {
                  type: bonus_type.id,
                }
              });

              let invite_points = invite_record?.points ? invite_record?.points : 0;

              const referrrerScore = await prisma.game.findFirst({
                where: { userId: referrer.id }
              });

              // console.log("referrrerScore", referrrerScore);
              let result;
              if (referrrerScore) {
                let refferal_points = referrrerScore?.points ? referrrerScore?.points : 0;

                result = await prisma.game.update({
                  where: { id: referrrerScore.id },
                  data: {
                    points: refferal_points + invite_points
                  },
                });
              } else {
                result = await prisma.game.create({
                  data: {
                    userId: referrer.id,
                    score: 0,
                    level: 1,
                    points: invite_points,
                  },
                });
              }

              result = await prisma.bonusHistory.create({
                data: {
                  type: bonus_type.id,
                  userId: referrer.id,
                  from: telegramId,
                  rewards: invite_points
                },
              });
            }
          }       
        }

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
        await axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`, {
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
        await axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`, {
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
