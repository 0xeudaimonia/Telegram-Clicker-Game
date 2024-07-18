"use client";
import { useEffect, useState, useRef } from "react";
import { getBoosterReward, calculateSpeedIncrease } from "../utils/gameLogic";
import useBlock from "./Block";
import useTower from "./Tower";

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const block = useBlock();
  const tower = useTower();
  const [gameState, setGameState] = useState("start");
  const [boosterLevel, setBoosterLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [reward, setReward] = useState(0);
  const [points, setPoints] = useState(0);

  const handleStart = () => {
    setGameState("playing");
  };

  const handleRestart = () => {
    block.reset();
    tower.reset();
    setGameState("playing");
    setScore(0);
    setReward(0);
    setPoints(0);
  };

  const handleClick = () => {
    if (gameState === "gameover") {
      handleRestart();
    } else if (block.state === "ready") {
      block.state = "dropped";
    }
  };

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
          setScore(score + 1);

          if ((score + 1) % 10 === 0) {
            setPoints(points + 1000);
            const baseReward = getBoosterReward(boosterLevel);
            const speedIncrease = calculateSpeedIncrease(
              baseReward,
              boosterLevel
            );
            setReward(speedIncrease);
          }
        } else {
          block.state = "miss";
        }
      }

      if (block.state === "miss") {
        setGameState("gameover");
      }

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

    window.addEventListener("keydown", handleKeyDown);
    canvas?.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas?.removeEventListener("click", handleClick);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [block, tower, gameState, score, boosterLevel, points]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-black w-full h-full bg-[url('/assets/background0.jpg')] bg-cover bg-center rounded-2xl"
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
      <div className="absolute top-0 left-0 p-4 text-white">
        <h5>Score: {score}</h5>
        <h5>Reward: {reward}</h5>
        <h5>Points: {points}</h5>
      </div>
    </div>
  );
};

export default GameCanvas;
