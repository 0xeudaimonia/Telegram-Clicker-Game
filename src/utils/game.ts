import { useEffect, useRef } from 'react';

// Define game constants
const grav = 0.5;
const rope_length = 120;
let force = -0.001;

class Block {
  image: HTMLImageElement;
  x: number;
  y: number;
  speed: number;
  angle: number;
  state: string;
  acceleration: number;
  xlast: number;

  constructor() {
    this.image = new Image();
    this.image.src = '/assets/block.png';
    this.x = 370;
    this.y = 150;
    this.speed = 0;
    this.angle = 45;
    this.state = 'ready';
    this.acceleration = 0;
    this.xlast = 0;
  }

  swing() {
    this.x = 370 + rope_length * Math.sin(this.angle);
    this.y = 20 + rope_length * Math.cos(this.angle);
    this.angle += this.speed;
    this.acceleration = Math.sin(this.angle) * force;
    this.speed += this.acceleration;
  }

  drop(tower: Tower) {
    if (this.state === 'ready') {
      this.state = 'dropped';
      this.xlast = this.x;
    }

    if (this.collided(tower)) {
      this.state = 'landed';
    }

    if (tower.size === 0 && this.y >= 536) {
      this.state = 'landed';
    }

    if (tower.size >= 1 && this.y >= 536) {
      this.state = 'miss';
    }

    if (this.state === 'dropped') {
      this.speed += grav;
      this.y += this.speed;
    }
  }

  collided(tower: Tower) {
    if (tower.size === 0) {
      return false;
    }
    if (
      this.xlast < tower.xlist[tower.xlist.length - 1] + 60 &&
      this.xlast > tower.xlist[tower.xlist.length - 1] - 60 &&
      tower.y - this.y <= 70
    ) {
      if (
        this.xlast < tower.xlist[tower.xlist.length - 1] + 5 &&
        this.xlast > tower.xlist[tower.xlist.length - 1] - 5
      ) {
        tower.golden = true;
      } else {
        tower.golden = false;
      }
      return true;
    } else {
      return false;
    }
  }

  toBuild(tower: Tower) {
    if (tower.size === 0 || this.collided(tower)) {
      return true;
    }
    return false;
  }

  display(context: CanvasRenderingContext2D, origin: { x: number; y: number }) {
    context.drawImage(this.image, this.x, this.y);
    if (this.state === 'ready') {
      this.drawRope(context, origin);
    }
  }

  drawRope(context: CanvasRenderingContext2D, origin: { x: number; y: number }) {
    context.beginPath();
    context.moveTo(origin.x, origin.y);
    context.lineTo(this.x + 32, this.y);
    context.stroke();
  }

  respawn(tower: Tower) {
    if (tower.size % 2 === 0) {
      this.angle = -45;
    } else {
      this.angle = 45;
    }
    this.y = 150;
    this.x = 370;
    this.speed = 0;
    this.state = 'ready';
    force *= 1.02;
  }
}

class Tower {
  size: number;
  image: HTMLImageElement;
  xbase: number;
  y: number;
  height: number;
  xlist: number[];
  onscreen: number;
  change: number;
  speed: number;
  wobbling: boolean;
  scrolling: boolean;
  golden: boolean;
  displayStatus: boolean;

  constructor() {
    this.size = 0;
    this.image = new Image();
    this.image.src = '/assets/block.png';
    this.xbase = 0;
    this.y = 600;
    this.height = 0;
    this.xlist = [];
    this.onscreen = 0;
    this.change = 0;
    this.speed = 0.4;
    this.wobbling = false;
    this.scrolling = false;
    this.golden = false;
    this.displayStatus = true;
  }

  build(block: Block) {
    this.size += 1;
    this.onscreen += 1;

    if (this.size === 1) {
      this.xbase = block.xlast;
      this.xlist.push(this.xbase);
    } else {
      this.xlist.push(block.xlast);
    }

    if (this.size <= 5) {
      this.height = this.size * 64;
      this.y = 600 - this.height;
    } else {
      this.height += 64;
      this.y -= 64;
    }
  }

  wobble() {
    const width = this.getWidth();
    if ((width > 100 || width < -100) && this.size >= 5) {
      this.wobbling = true;
    }
    if (this.wobbling) {
      this.change += this.speed;
    }
    if (this.change > 20) {
      this.speed = -0.4;
    } else if (this.change < -20) {
      this.speed = 0.4;
    }
  }

  display(context: CanvasRenderingContext2D) {
    const buildlist = this.xlist.slice(-this.onscreen);
    for (let i = 0; i < buildlist.length; i++) {
      context.drawImage(this.image, buildlist[i], 600 - 64 * (i + 1));
    }
  }

  getWidth() {
    let width = 64;
    if (this.size === 0) {
      return width;
    }
    if (this.xlist[this.size - 1] > this.xbase) {
      width = this.xlist[this.size - 1] - this.xbase + 64;
    } else {
      width = -((this.xbase - this.xlist[this.size - 1]) + 64);
    }
    return width;
  }

  scroll() {
    if (this.y <= 440) {
      this.y += 5;
      this.scrolling = true;
    } else {
      this.height = 160;
      this.scrolling = false;
      this.onscreen = 3;
    }
  }

  reset() {
    this.onscreen = 3;
    this.y = 440;
  }
}

const initGame = (context: CanvasRenderingContext2D, gameState: any, setGameState: any) => {
  // Initialize game state
};

const gameLoop = (context: CanvasRenderingContext2D, gameState: any, setGameState: any) => {
  const { block, tower } = gameState;
  const origin = { x: 400, y: 3 };

  const loop = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    if (block.state === 'ready') {
      block.swing();
    }

    if (block.state === 'dropped') {
      block.drop(tower);
    }

    if (block.state === 'landed') {
      if (block.toBuild(tower)) {
        tower.build(block);
        block.respawn(tower);
      } else {
        block.state = 'miss';
      }
    }

    if (block.state === 'miss') {
      // Handle miss state
    }

    block.display(context, origin);
    tower.display(context);

    requestAnimationFrame(loop);
  };

  loop();
};

export { Block, Tower, initGame, gameLoop };
