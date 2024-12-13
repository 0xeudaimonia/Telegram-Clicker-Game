"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { getBoosterReward, calculateSpeedIncrease } from "../utils/gameLogic";
import useBlock from "./Block";
import useTower from "./Tower";
import { useAppProvider } from "@components/layouts/AppProvider";
import { fetchPoints } from "@utils/gameStatus";
import { io, Socket } from "socket.io-client";

interface GameCanvasProps {
  userId: string;
  dropFlag: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ userId, dropFlag }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const block = useBlock();
  const tower = useTower();
  const [gameState, setGameState] = useState("start");
  const [boosterLevel, setBoosterLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [reward, setReward] = useState(0);
  const [gamePoints, setGamePoints] = useState(0);
  const [backgroundY, setBackgroundY] = useState(0);
  const [tgUserId, setTgUserId] = useState<string>("");
  const { setUserPoints, currentUserId, setCurrentUserId } = useAppProvider();
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleStart = () => {
    setGameState("playing");
  };

  const handleRestart = () => {
    block.reset();
    tower.reset();
    setGameState("playing");
    setScore(0);
    setReward(0);
    setGamePoints(0);
    setBackgroundY(0);
  };

  const handleClick = () => {
    if (gameState === "gameover") {
      handleRestart();
    } else if (block.state === "ready") {
      block.state = "dropped";
    }
  };

  const saveScore = async (score: number, level: number, points: number) => {
    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
          score,
          level,
          points: points,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save score");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  // const getPoints = async (currentUserId: string) => {
  //   const result = await fetchPoints(currentUserId);
  //   setUserPoints(result.points);
  // }

  const updatePoints = useCallback(async (points: number) => {
    const newSocket = io();
    setSocket(newSocket);
    newSocket.emit("joinGame", currentUserId);
    newSocket.on("updatePoints", (points: number) => {
      setUserPoints(points);
    });
    newSocket.emit("updatePoints", { userId: currentUserId, points });
    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId, setUserPoints]);

  useEffect(() => {
    handleClick();
  }, [dropFlag]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const origin = { x: 400, y: 0 };

    const gameLoop = () => {
      context?.clearRect(0, 0, context.canvas.width, context.canvas.height);

      if (block.state === "ready") {
        block.swing();
      }

      if (block.state === "dropped") {
        block.drop(tower);
      }

      if (block.state === "landed") {
        if (block.toBuild(tower)) {
          tower.build(block);
          block.respawn(tower);
          setScore((prevScore) => prevScore + 1);

          if ((score + 1) % 10 === 0) {
            saveScore(score, boosterLevel, 1000);
            // setUserPoints((prevPoints) => prevPoints + 1000);
            updatePoints(0);
            setGamePoints((prevPoints) => prevPoints + 1000);
            const baseReward = getBoosterReward(boosterLevel);
            const speedIncrease = calculateSpeedIncrease(
              baseReward,
              boosterLevel
            );
            // getPoints(userId);
            setReward(speedIncrease);
          }

          setBackgroundY((prevY) => (prevY + 40) % 1800);
        } else {
          block.state = "miss";
        }
      }

      if (block.state === "miss") {
        setGameState("gameover");
        saveScore(score, boosterLevel, 0);
        updatePoints(0);
      }

      const drawBackground = (context: CanvasRenderingContext2D) => {
        const backgrounds = [
          "/assets/background0.jpg",
          "/assets/background1.jpg",
          "/assets/background2.jpg",
          "/assets/background3.jpg",
        ];
        const imageHeight = 600;

        backgrounds.forEach((src, i) => {
          const yPosition = backgroundY - i * imageHeight;
          const img = new Image();
          img.src = src;
          context.drawImage(img, 0, yPosition);
          context.drawImage(
            img,
            0,
            yPosition - imageHeight * backgrounds.length
          );
        });

        if (backgroundY > imageHeight * backgrounds.length) {
          setBackgroundY(0);
        }
      };

      drawBackground(context!);

      block.display(context!, origin);
      tower.display(context!);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameState === "playing") {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && block.state === "ready") {
        block.state = "dropped";
      }
    };

    // window.addEventListener("keydown", handleKeyDown);
    canvas?.addEventListener("click", handleClick);

    return () => {
      // window.removeEventListener("keydown", handleKeyDown);
      canvas?.removeEventListener("click", handleClick);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, tower, gameState, score, boosterLevel, gamePoints, backgroundY]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-black w-full h-full rounded-2xl bg-[url('/assets/mask_group.jpg')] bg-cover bg-no-repeat"
        onClick={handleClick}
      />
      {gameState === "start" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 text-white rounded-lg p-8">
            <h1 className="text-2xl mb-4">Tower Building Game</h1>
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-blue-500 rounded-md text-2xl hover:bg-blue-700"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl mb-4">Game Over</h1>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-500 rounded-md text-2xl hover:bg-blue-700"
          >
            Restart
          </button>
        </div>
      )}
      {gameState === "playing" && (
        <div className="absolute top-0 left-0 p-4 font-thin text-red-900">
          <h5>Score: {score}</h5>
          <h5>Reward: {reward}</h5>
          <h5>Points: {gamePoints}</h5>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
