import { useEffect, useRef, useState } from "react";

// Define the types for the game objects
interface Block {
  swing: () => void;
  drop: (tower: Tower) => void;
  display: (
    context: CanvasRenderingContext2D,
    origin: { x: number; y: number }
  ) => void;
  respawn: (tower: Tower) => void;
  reset: () => void;
  state: string;
  toBuild: (tower: Tower) => boolean;
  xlast: number;
  y: number;
}

interface Tower {
  build: (block: Block) => void;
  wobble: () => void;
  display: (context: CanvasRenderingContext2D) => void;
  scroll: () => void;
  reset: () => void;
  size: number;
  xlist: number[];
  y: number;
  golden: boolean;
}

const useBlock = (): Block => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [x, setX] = useState(370);
  const [y, setY] = useState(150);
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(45);
  const [state, setState] = useState("ready");
  const [acceleration, setAcceleration] = useState(0);
  const [xlast, setXlast] = useState(0);
  const grav = 0.6;
  let force = -0.001;

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/block.png";
    setImage(img);
  }, []);

  const swing = () => {
    const rope_length = 100;
    let newAngle = angle + speed;

    // Limit angle between -135 degrees and 45 degrees (180 degrees swing)
    if (newAngle > 45) {
      newAngle = 45;
    } else if (newAngle < -135) {
      newAngle = -135;
    }

    setX(370 + rope_length * Math.sin(newAngle));
    setY(20 + rope_length * Math.cos(newAngle));
    setAngle(newAngle);
    setAcceleration(Math.sin(newAngle) * force);
    setSpeed(speed + 1.5 * acceleration);
  };

  const drop = (tower: Tower) => {
    if (state === "ready") {
      setState("dropped");
      setXlast(x);
    }

    if (collided(tower)) {
      setState("landed");
    }

    if (tower.size === 0 && y >= 536) {
      setState("landed");
    }

    if (tower.size >= 1 && y >= 536) {
      setState("miss");
    }

    if (state === "dropped") {
      setSpeed(speed + grav);
      setY(y + speed);
      setXlast(x);
    }
  };

  const collided = (tower: Tower): boolean => {
    if (tower.size === 0) return false;
    const lastBlockX = tower.xlist[tower.xlist.length - 1];
    const withinXRange = xlast < lastBlockX + 60 && xlast > lastBlockX - 60;
    const withinYRange = tower.y - y <= 70;
    if (withinXRange && withinYRange) {
      tower.golden = xlast < lastBlockX + 5 && xlast > lastBlockX - 5;
      return true;
    }
    return false;
  };

  const toBuild = (tower: Tower): boolean =>
    tower.size === 0 || collided(tower);

  const display = (
    context: CanvasRenderingContext2D,
    origin: { x: number; y: number }
  ) => {
    if (image && state === "ready") {
      context.drawImage(image, x, y);
      drawRope(context, origin);
    }
  };

  const drawRope = (
    context: CanvasRenderingContext2D,
    origin: { x: number; y: number }
  ) => {
    context.beginPath();
    context.moveTo(origin.x, origin.y);
    context.lineTo(x + 32, y);
    context.stroke();
  };

  const respawn = (tower: Tower) => {
    setAngle(tower.size % 2 === 0 ? -45 : 45);
    setY(150);
    setX(370);
    setSpeed(0);
    setState("ready");
    force *= 1.02;
  };

  const reset = () => {
    setX(370);
    setY(150);
    setSpeed(0);
    setAngle(45);
    setState("ready");
    setAcceleration(0);
    setXlast(0);
    force = -0.001;
  };

  return {
    swing,
    drop,
    display,
    respawn,
    reset,
    state,
    toBuild,
    xlast,
    y,
  };
};

const useTower = (): Tower => {
  const [size, setSize] = useState(0);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [xbase, setXbase] = useState(0);
  const [y, setY] = useState(600);
  const [height, setHeight] = useState(0);
  const [xlist, setXlist] = useState<number[]>([]);
  const [onscreen, setOnscreen] = useState(0);
  const [change, setChange] = useState(0);
  const [speed, setSpeed] = useState(0.4);
  const [wobbling, setWobbling] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [golden, setGolden] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/block.png";
    setImage(img);
  }, []);

  const build = (block: Block) => {
    setSize((prevSize) => prevSize + 1);
    setOnscreen((prevOnscreen) => prevOnscreen + 1);

    if (size === 0) {
      setXbase(block.xlast);
      setXlist([block.xlast]);
    } else {
      setXlist((prevXlist) => [...prevXlist, block.xlast]);
    }

    if (size <= 5) {
      setHeight((prevHeight) => size * 64);
      setY((prevY) => 600 - height);
    } else {
      setHeight((prevHeight) => prevHeight + 64);
      setY((prevY) => prevY - 64);
    }
  };

  const wobble = () => {
    const width = getWidth();
    if ((width > 100 || width < -100) && size >= 5) {
      setWobbling(true);
    }
    if (wobbling) {
      setChange((prevChange) => prevChange + speed);
    }
    if (change > 20) {
      setSpeed(-0.4);
    } else if (change < -20) {
      setSpeed(0.4);
    }
  };

  const display = (context: CanvasRenderingContext2D) => {
    const buildlist = xlist.slice(-onscreen);
    buildlist.forEach((blockX, index) => {
      if (image) {
        context.drawImage(image, blockX, 600 - 64 * (index + 1));
      }
    });
  };

  const getWidth = (): number => {
    let width = 64;
    if (size > 0) {
      const lastBlockX = xlist[size - 1];
      width =
        lastBlockX > xbase
          ? lastBlockX - xbase + 64
          : -(xbase - lastBlockX + 64);
    }
    return width;
  };

  const scroll = () => {
    if (y <= 440) {
      setY((prevY) => prevY + 5);
      setScrolling(true);
    } else {
      setHeight(160);
      setScrolling(true);
      setOnscreen(3);
    }
  };

  const reset = () => {
    setSize(0);
    setOnscreen(0);
    setY(600);
    setHeight(0);
    setXlist([]);
    setChange(0);
    setSpeed(0.4);
    setWobbling(false);
    setScrolling(false);
    setGolden(false);
  };

  return {
    build,
    wobble,
    display,
    scroll,
    reset,
    size,
    xlist,
    y,
    golden,
  };
};

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const block = useBlock();
  const tower = useTower();
  const [gameState, setGameState] = useState({
    block,
    tower,
    score: 0,
    gameOver: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      const origin = { x: 400, y: 3 };

      const gameLoop = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

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
          } else {
            block.state = "miss";
          }
        }

        if (block.state === "miss") {
          tower.reset();
          block.reset();
          return;
        }

        block.display(context, origin);
        tower.display(context);

        requestAnimationFrame(gameLoop);
      };

      gameLoop();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && block.state === "ready") {
        block.state = "dropped";
      }
    };

    const handleClick = () => {
      if (block.state === "ready") {
        block.state = "dropped";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas?.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas?.removeEventListener("click", handleClick);
    };
  }, [block, tower]);

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
