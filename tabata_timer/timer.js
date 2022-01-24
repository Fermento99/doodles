


class Timer {
  constructor(canvas, colors, backword= false, callback = () => { }) {
    canvas.height = 500;
    canvas.width = 500;
    this.ctx = canvas.getContext('2d');
    this.colors = colors;
    this.backword = backword;
    this.callback = callback;
    this._start = Date.now();
    this._end = this._start + 4000;
    this._paused = 0;
    this._timer = 0;

    this.finished = false;
    this.progress = .25;
    this.countdown = 3;
    this.drawSector(0, 0)
  }

  setTimerPeriod(start, end) {
    this._start = start;
    this._end = end;
  }

  setColors(colors) {
    this.colors = colors;
  }

  reset() {
    if (this._timer !== 0) clearInterval(this._timer);
    this._timer = 0;
    this._paused = 0;
    this.progress = .25;
    this.countdown = 3;
    this.finished = false;
  }

  start() {
    if (this._timer === 0) {
      if (this._paused !== 0) {
        const diff = Date.now() - this._paused;
        this._start = this._start + diff;
        this._end = this._end + diff;
        this._paused = 0;
      }

      this._timer = setInterval(() => this.run(), 30);
    }
  }

  pause() {
    if (!this.finished && this._paused === 0) {
      this._paused = Date.now();
      clearInterval(this._timer);
      this._timer = 0;
    }
  }

  finish() {
    clearInterval(this._timer);
    this.finished = true;
    this.callback('finish');
  }

  run() {
    if (!this.finished) {
      const now = Date.now();
      const time = now - this._start;
      const percent = time / (this._end - this._start);
      this.drawSector(percent, ((this.backword ? this._end - now : time) / 1000).toFixed(2));
      if (percent >= 1) {
        this.finish();
      } else {
        if (percent >= this.progress) {
          this.callback(this.progress * 100 + 'pc');
          this.progress += .25;
        }
        if (this._end - now <= this.countdown * 1000) {
          this.callback(this.countdown);
          this.countdown--;
        }
      }
    } else {
      clearInterval(this._timer);
    }
  }

  drawSector(percent, time) {
    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.escape;
    this.ctx.arc(250, 250, 250, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.chase;
    this.ctx.moveTo(250, 250);
    this.ctx.arc(250, 250, 250, -Math.PI / 2, Math.PI * (2 * percent - 0.5));
    this.ctx.lineTo(250, 250);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.center;
    this.ctx.arc(250, 250, 100, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors.text;
    this.ctx.textAlign = 'center';
    this.ctx.font = '50px "Share Tech Mono", monospace';

    if (time / 60 > 1) time = formatMinutes(time);
    else time += 's'
    this.ctx.fillText(time, 250, 262);
    this.ctx.closePath();
  }
}

const formatMinutes = (time) => {
  const m = String(Math.floor(time / 60)).padStart(2, '0')
  const s = String(Math.floor(time % 60)).padStart(2, '0')
  return m + ':' + s
} 