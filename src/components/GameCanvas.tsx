import { useEffect, useRef, useState } from "react";
import { Block, Tower, initGame, gameLoop } from "../utils/game";
import { backgroundMusic } from "../utils/audio";

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState({
    block: new Block(),
    tower: new Tower(),
    score: 0,
    gameOver: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      initGame(context, gameState, setGameState);
      gameLoop(context, gameState, setGameState);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && gameState.block.state === "ready") {
        gameState.block.state = "dropped";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-black w-full bg-[url('/assets/background0.jpg')] bg-cover bg-center rounded-2xl"
    />
  );
};

export default GameCanvas;
