import { useEffect, useState, useCallback } from "react";

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
  display: (context: CanvasRenderingContext2D) => void;
  reset: () => void;
  size: number;
  xlist: number[];
  y: number;
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

  const swing = useCallback(() => {
    const rope_length = 100;
    let newAngle = angle + speed;

    if (newAngle > 45) {
      newAngle = 45;
    } else if (newAngle < -45) {
      newAngle = 130;
    }

    setX(370 + rope_length * Math.sin(newAngle));
    setY(20 + rope_length * Math.cos(newAngle));
    setAngle(newAngle);
    setAcceleration(Math.sin(newAngle) * force);
    setSpeed(speed + 1.5 * acceleration);
  }, [acceleration, angle, force, speed]);

  const collided = useCallback(
    (tower: Tower): boolean => {
      if (tower.size === 0) return false;
      const lastBlockX = tower.xlist[tower.xlist.length - 1];
      const withinXRange = xlast < lastBlockX + 60 && xlast > lastBlockX - 60;
      const withinYRange = tower.y - y <= 64 && tower.y - y >= 0;
      return withinXRange && withinYRange;
    },
    [xlast, y]
  );

  const drop = useCallback(
    (tower: Tower) => {
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
        setSpeed((prevSpeed) => prevSpeed + grav);
        setY((prevY) => prevY + speed);
        setXlast(x);
      }
    },
    [state, x, y, speed, grav, collided]
  );

  const toBuild = useCallback(
    (tower: Tower): boolean => tower.size === 0 || collided(tower),
    [collided]
  );

  const drawRope = useCallback(
    (context: CanvasRenderingContext2D, origin: { x: number; y: number }) => {
      context.beginPath();
      context.moveTo(origin.x, origin.y);
      context.lineTo(x + 32, y);
      context.stroke();
    },
    [x, y]
  );

  const display = useCallback(
    (context: CanvasRenderingContext2D, origin: { x: number; y: number }) => {
      if (image) {
        context.drawImage(image, x, y);
        if (state === "ready") {
          drawRope(context, origin);
        }
      }
    },
    [image, state, x, y, drawRope]
  );

  const respawn = useCallback((tower: Tower) => {
    setAngle(tower.size % 2 === 0 ? -45 : 45);
    setY(150);
    setX(370);
    setSpeed(0);
    setState("ready");
  }, []);

  const reset = useCallback(() => {
    setX(370);
    setY(150);
    setSpeed(0);
    setAngle(45);
    setState("ready");
    setAcceleration(0);
    setXlast(0);
  }, []);

  return {
    swing,
    drop,
    display,
    respawn,
    reset,
    state,
    xlast,
    y,
    toBuild,
  };
};

export default useBlock;
