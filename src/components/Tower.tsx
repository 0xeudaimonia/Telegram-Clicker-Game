import { useEffect, useState, useCallback } from "react";

interface Tower {
  build: (block: Block) => void;
  display: (context: CanvasRenderingContext2D) => void;
  reset: () => void;
  size: number;
  xlist: number[];
  y: number;
}

interface Block {
  xlast: number;
  y: number;
}

const useTower = (): Tower => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [size, setSize] = useState(0);
  const [xlist, setXlist] = useState<number[]>([]);
  const [y, setY] = useState(536);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/block.png";
    setImage(img);
  }, []);

  const build = useCallback((block: Block) => {
    setSize((prevSize) => prevSize + 1);
    setXlist((prevXlist) => [...prevXlist, block.xlast]);
    setY((prevY) => prevY - 10);
  }, []);

  const display = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (image) {
        for (let i = 0; i < size; i++) {
          context.drawImage(image, xlist[i], y + 64 * (size - i - 1));
        }
      }
    },
    [image, size, xlist, y]
  );

  const reset = useCallback(() => {
    setSize(0);
    setXlist([]);
    setY(536);
  }, []);

  return {
    build,
    display,
    reset,
    size,
    xlist,
    y,
  };
};

export default useTower;
