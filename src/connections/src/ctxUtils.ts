import { Segment, Point, Vector } from './Connections';

class CtxHelper {
  _ctx: CanvasRenderingContext2D;
  pointRadius = 3;
  pointColor = 'gray';
  segmentWidth = 2;
  segmentColor = '#aaa';

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
  }

  clear(dimmentions: Vector) {
    this._ctx.clearRect(0, 0, dimmentions.x, dimmentions.y);
  }

  drawPoint(point: Vector) {
    this._ctx.beginPath();
    this._ctx.fillStyle = this.pointColor;
    this._ctx.arc(point.x, point.y, this.pointRadius, 0, Math.PI * 2, true);
    this._ctx.fill();
    this._ctx.closePath();
  }

  drawSegment(segment: Segment) {
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
