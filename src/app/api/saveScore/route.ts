import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { io, Socket } from "socket.io-client";

const scoreSchema = z.object({
  userId: z.number().int(),
  score: z.number().int().nonnegative(),
  level: z.number().int().nonnegative(),
  points: z.number().int().nonnegative(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, score, level, points } = scoreSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found");

      const existingGame = await tx.game.findFirst({ where: { userId } });

      if (existingGame) {
        return tx.game.update({
          where: { id: existingGame.id },
          data: {
            score: existingGame.score + score,
            points: existingGame.points + points,
            level,
          },
        });
      } else {
        return tx.game.create({
          data: { userId, score, level, points },
        });
      }
    });

    const newSocket = io();
    newSocket.emit("joinGame", userId);
    newSocket.emit("updatePoints", { points });
    newSocket.disconnect();

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.log("Error saving or updating score:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
