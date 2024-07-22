import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { env } from 'process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;

type TelegramUpdate = {
    message?: {
        text: string;
        chat: {
            first_name: string;
            id: number;
        };
    };
};

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const update: TelegramUpdate = await req.json();
        if (update.message && update.message.text) {
          const { text, chat } = update.message;
          const chatId = chat.id;
          const userName = chat.first_name;
          
          // Handle different commands
          switch (text.trim().toLowerCase()) {
              case '/start':
                  await sendStartMessage(chatId);
                  break;
              case '/about':
                  await sendAboutMessage(chatId);
                  break;
              default:
                  await sendMessage(chatId, `You said: ${text}`);
                  break;
          }
          
          const existingUser = await prisma.user.findUnique({
            where: { telegramId: chatId },
          });
          if (!existingUser) {
            // If user does not exist, save the message
            try {
              await prisma.user.create({
                data: {
                  telegramId: chatId,
                  username: userName,
                  data: { text },
                },
              });
            } catch (error) {
              console.error('Error saving message:', error);
              return NextResponse.json('Internal Server Error', { status: 500 });
            }
          } else {
            try {
              await prisma.user.update({
                where: { telegramId: chatId },
                data: {
                  username: userName,
                  data: {  text: text},
                },
              });
            }
            catch (error) {
              console.error('Error updating message:', error);
              return NextResponse.json('Internal Server Error', { status: 500 });
            }
          }
        }
        return NextResponse.json('ok');
    } else {
        return NextResponse.json('Method Not Allowed', { status: 405 });
    }
}

const sendStartMessage = async (chatId: number) => {
    const startMessage = 'Welcome to the Bot!\n\nSend /about to learn more about me.';
    await sendMessage(chatId, startMessage);
};

const sendAboutMessage = async (chatId: number) => {
    const aboutMessage = 'This bot is created using Next.js and TypeScript.';
    await sendMessage(chatId, aboutMessage);
};

const sendMessage = async (chatId: number, text: string) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text
        })
    });
};
