import { Point } from './types';

class DisplayHandler {
  cellSize: Point;
  _display: HTMLCanvasElement;
  _dimentions: Point = { x: 0, y: 0 };
  _ctx: CanvasRenderingContext2D;
  _drawing = false;
  _lastDrawn?: Point;
  drawHandler?: (point: Point) => void;

  constructor(display: HTMLCanvasElement) {
    this._display = display;
    this._ctx = display.getContext('2d')!;
    this.cellSize = { x: 10, y: 10 };
    this.setSize({ x: true, y: true });

    display.addEventListener('mousedown', (event: MouseEvent) => {
      this.setDrawingMode(true);
      this.handleDraw({ x: event.offsetX, y: event.offsetY });
    });

    display.addEventListener('mouseup', () => {
      this.setDrawingMode(false);
    });

    display.addEventListener('mouseleave', () => {
      this.setDrawingMode(false);
    });

    display.addEventListener('mouseenter', (event: MouseEvent) => {
      if (event.buttons === 1) this.setDrawingMode(true);
    });

    display.addEventListener('mousemove', (event: MouseEvent) => {
      this.handleDraw({ x: event.offsetX, y: event.offsetY });
    });
  }

  setSize({ x, y }: { x: true | number; y: true | number }): void {
    const width = (x === true ? this.getFullWidth() : x) * this.cellSize.x;
    const height = (y === true ? this.getFullHeight() : y) * this.cellSize.y;

    this._display.width = width;
    this._display.height = height;
  }

  getFullWidth(): number {
    return Math.floor(document.body.clientWidth / this.cellSize.x);
  }

  getFullHeight(): number {
    return Math.floor(document.body.clientHeight / this.cellSize.y);
  }

  setDrawingMode(mode: boolean): void {
    this._drawing = mode;
    if (!mode) {
      this._lastDrawn = undefined;
    }
  }

  handleDraw(coords: Point): void {
    if (this._drawing && this.drawHandler) {
      const point = {
        x: Math.floor(coords.x / this.cellSize.x),
        y: Math.floor(coords.y / this.cellSize.y),
      };

      if (point.x !== this._lastDrawn?.x || point.y !== this._lastDrawn.y) {
        this.drawHandler(point);
        this._lastDrawn = point;
      }
    }
  }

  getMaxDimentions(): Point {
    return { x: this.getFullWidth(), y: this.getFullHeight() };
  }

  drawCell({ x, y }: Point): void {
    const { x: cellWidth, y: cellHeight } = this.cellSize;
    this._ctx.beginPath();
    this._ctx.fillStyle = '#111';
    this._ctx.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
    this._ctx.closePath();
  }

  clear(): void {
    this._ctx.beginPath();
    this._ctx.fillStyle = '#fff';
    this._ctx.fillRect(0, 0, this._display.width, this._display.height);
    this._ctx.closePath();
  }
}

export { DisplayHandler };
