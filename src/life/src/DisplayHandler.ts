import { Point, Color } from './types';
import { Cell } from './Simulation';

class DisplayHandler {
  monochromatic = true;
  cellSize: Point;
  _drawing = false;
  _display: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  _lastDrawn?: Point;
  drawHandler?: (point: Point) => void;

  constructor(display: HTMLCanvasElement) {
    this._display = display;
    this._ctx = display.getContext('2d')!;
    this.cellSize = { x: 10, y: 10 };

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

  getDimentions(): Point {
    return { x: this._display.width / this.cellSize.x, y: this._display.height / this.cellSize.y };
  }

  drawCell({ position: { x, y }, color }: Cell): void {
    const { x: cellWidth, y: cellHeight } = this.cellSize;
    this._ctx.fillStyle = this._convertColor(color);
    this._ctx.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
  }

  _convertColor({ r, g, b }: Color): string {
    return this.monochromatic
      ? 'rgba(0,0,0)'
      : `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`;
  }

  clear(): void {
    this._ctx.clearRect(0, 0, this._display.width, this._display.height);
  }
}

export { DisplayHandler };
