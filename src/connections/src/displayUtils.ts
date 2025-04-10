interface Drawable {
  drawFrame(timeElapsed: number): void;
  pause(): void;
}

const updateDisplaySize = (display: HTMLCanvasElement): void => {
  display.width = document.body.clientWidth;
  display.height = document.body.clientHeight;
};

const setupDisplay = (): HTMLCanvasElement => {
  const display = <HTMLCanvasElement>document.getElementById('display');

  window.addEventListener('resize', () => {
    updateDisplaySize(display);
  });
  updateDisplaySize(display);

  return display;
};

class AnimationController {
  _frameTime: number;
  _drawing?: Drawable;
  _animationFrame?: number;
  _timeout?: ReturnType<typeof setTimeout>;
  _paused = false;

  constructor() {
    this._frameTime = 16.6;
  }

  setDrawing(drawing: Drawable): void {
    this._drawing = drawing;
  }

  setFPS(fps: number): void {
    this._frameTime = 1000 / fps;
  }

  start(): void {
    if (!this._drawing || this._animationFrame || this._timeout) return;
    this._animationFrame = requestAnimationFrame(timestamp => {
      this.loop(timestamp);
    });
  }

  loop(startTime: number): void {
    if (this._paused) {
      this._paused = false;
      this._drawing!.drawFrame(performance.now());
    } else {
      this._drawing!.drawFrame(startTime);
    }

    const wait = this._frameTime - performance.now() + startTime;

    if (wait > 0) {
      this._timeout = setTimeout(() => {
        this._animationFrame = requestAnimationFrame(timestamp => {
          this.loop(timestamp);
        });
      }, wait);
    } else {
      this._animationFrame = requestAnimationFrame(timestamp => {
        this.loop(timestamp);
      });
    }
  }

  stop(): void {
    this._drawing!.pause();

    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = undefined;
    }
  }
}

export type { Drawable };
export { setupDisplay, AnimationController };
