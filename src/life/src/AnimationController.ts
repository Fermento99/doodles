import { Drawable } from './types';

class AnimationController {
  _frameTime: number;
  _drawable: Drawable;
  _animationFrame?: number;
  _timeout?: ReturnType<typeof setTimeout>;
  _paused = false;

  constructor(drawable: Drawable) {
    this._frameTime = 500;
    this._drawable = drawable;
    this._start();
  }

  setSpeed(speed: number): void {
    if (speed === 0) {
      this._stop();
    } else {
      if (this._paused) {
        this._paused = false;
        this._start();
      }
      this._frameTime = 1000 / Math.pow(2, speed);
    }
  }

  _stop(): void {
    this._paused = true;

    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = undefined;
    }
  }

  _start(): void {
    if (this._animationFrame || this._timeout) return;

    this._animationFrame = requestAnimationFrame(timestamp => {
      this._loop(timestamp);
    });
  }

  _loop(startTime: number): void {
    this._drawable.drawFrame();

    const wait = this._frameTime - performance.now() + startTime;

    if (wait > 0) {
      this._timeout = setTimeout(() => {
        this._animationFrame = requestAnimationFrame(timestamp => {
          this._loop(timestamp);
        });
      }, wait);
    } else {
      this._animationFrame = requestAnimationFrame(timestamp => {
        this._loop(timestamp);
      });
    }
  }
}

export { AnimationController };
