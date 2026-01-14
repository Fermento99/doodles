import { Segment, Vector } from './Connections';
import { DEFAULT_VALUES } from './defaultValues';

class CtxHelper {
  _ctx: CanvasRenderingContext2D;
  pointRadius = 3;
  pointColor = DEFAULT_VALUES.pointColor;
  segmentWidth = 2;
  segmentColor = DEFAULT_VALUES.segmentColor;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
  }

  clear(dimensions: Vector): void {
    this._ctx.clearRect(0, 0, dimensions.x, dimensions.y);
  }

  drawPoint(point: Vector): void {
    this._ctx.beginPath();
    this._ctx.fillStyle = this.pointColor;
    this._ctx.arc(point.x, point.y, this.pointRadius, 0, Math.PI * 2, true);
    this._ctx.fill();
    this._ctx.closePath();
  }

  drawSegment(segment: Segment): void {
    this._ctx.beginPath();
    this._ctx.strokeStyle = this.segmentColor;
    this._ctx.lineWidth = this.segmentWidth;
    this._ctx.moveTo(segment[0].x, segment[0].y);
    this._ctx.lineTo(segment[1].x, segment[1].y);
    this._ctx.stroke();
    this._ctx.closePath();
  }
}

export { CtxHelper };
