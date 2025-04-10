import { Drawable } from './displayUtils';
import { CtxHelper } from './ctxUtils';

interface Vector {
  x: number;
  y: number;
}

type Segment = [Vector, Vector];

interface ConnectionOptions {
  pointCount: number;
  radius: number;
  minSpeed: number;
  maxSpeed: number;
}

class Connections implements Drawable {
  points: Point[] = [];
  pointCount = 20;
  radius = 250;
  minSpeed = 20;
  maxSpeed = 100;
  _dimmentions: Vector;
  _ctxHelper: CtxHelper;
  _lastTime?: number;

  constructor(display: HTMLCanvasElement) {
    this._dimmentions = { x: display.width, y: display.height };
    this._ctxHelper = new CtxHelper(display.getContext('2d')!);

    window.addEventListener('resize', () => {
      this._dimmentions = { x: display.width, y: display.height };
      this._ctxHelper = new CtxHelper(display.getContext('2d')!);
    });

    this.setup();
  }

  drawFrame(timeElapsed: number): void {
    this.clear();
    this.draw();
    this.movePoints(this._lastTime ? timeElapsed - this._lastTime : 0);
    this._lastTime = timeElapsed;
  }

  pause(): void {
    this._lastTime = undefined;
  }

  setOptions(options: ConnectionOptions): void {
    this.pointCount = options.pointCount;
    this.radius = options.radius;
    this.minSpeed = options.minSpeed;
    this.maxSpeed = options.maxSpeed;
  }

  clear(): void {
    this._ctxHelper.clear(this._dimmentions);
  }

  draw(): void {
    this.getConnections().forEach(segment => {
      this._ctxHelper.drawSegment(segment);
    });
    this.points.forEach(({ position }) => {
      this._ctxHelper.drawPoint(position);
    });
  }

  setup(): void {
    this.points = Array.from(
      { length: this.pointCount },
      () => new Point(this._dimmentions, this.minSpeed, this.maxSpeed)
    );
  }

  movePoints(deltaTime: number): void {
    const time = deltaTime / 1000;
    this.points.forEach(point => {
      point.position.x += time * point.velocity.x;
      point.position.y += time * point.velocity.y;

      point.checkBorderCollision(this._dimmentions);
    });
  }

  getConnections(): Segment[] {
    const segments: Segment[] = [];

    for (let i = 0; i < this.pointCount; i++) {
      const a = this.points[i];
      for (let j = i + 1; j < this.pointCount; j++) {
        const b = this.points[j];
        const connection = this.isConnected(a, b);
        if (connection) segments.push(...connection);
      }
    }

    return segments;
  }

  isConnected(a: Point, b: Point): Segment[] | null {
    const segment: Segment = [a.position, b.position];
    const distance = length(segment);
    return distance < this.radius ? [segment] : null;
  }
}

const length = (segment: Segment): number => {
  const dx = segment[0].x - segment[1].x;
  const dy = segment[0].y - segment[1].y;

  return Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);
};

class Point {
  position: Vector;
  velocity: Vector;

  constructor(dimmentions: Vector, minSpeed: number, maxSpeed: number) {
    const x = Math.random() * (dimmentions.x - 1);
    const y = Math.random() * (dimmentions.y - 1);

    const speedRange = maxSpeed - minSpeed;
    const dxs = Math.random() > 0.5 ? 1 : -1;
    const dys = Math.random() > 0.5 ? 1 : -1;
    const dx = Math.random() * speedRange + minSpeed;
    const dy = Math.random() * speedRange + minSpeed;

    this.position = { x, y };
    this.velocity = { x: dx * dxs, y: dy * dys };
  }

  checkBorderCollision(dimmentions: Vector): void {
    if (this.position.x > dimmentions.x) {
      this.position.x = 2 * dimmentions.x - this.position.x;
      this.velocity.x *= -1;
    }
    if (this.position.y > dimmentions.y) {
      this.position.y = 2 * dimmentions.y - this.position.y;
      this.velocity.y *= -1;
    }
    if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x *= -1;
    }
    if (this.position.y < 0) {
      this.velocity.y *= -1;
      this.position.y *= -1;
    }
  }
}

export type { Vector, Segment };
export { Connections, Point };
