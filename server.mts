import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinGame", async (userId) => {
      console.log("User joined game", userId);
      socket.join(`user_${userId}`);

      try {
        const game = await prisma.game.findFirst({
          where: { id: parseInt(userId) },
        });
        if (game) {
          socket.emit("updatePoints", game.points);
        }
      } catch (error) {
        console.error("Error fetching initial game points:", error);
      }
    });

    socket.on("updatePoints", async ({ userId, points }) => {
      try {
        const updatedGame = await prisma.game.upsert({
          where: { id: parseInt(userId) },
          update: { points: { increment: points } },
          create: { userId: parseInt(userId), points },
        });
        io.to(`user_${userId}`).emit("updatePoints", updatedGame.points);
      } catch (error) {
        console.error("Error updating game points:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
