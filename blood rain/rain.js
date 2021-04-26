
class Droplet {
  static trail = 1;

  constructor(ctx, setup) {
    this.ctx = ctx;

    this.setup = setup;
  }

  draw() {
    const tx = this.vx * Droplet.trail;
    const ty = this.vy * Droplet.trail;

    this.ctx.beginPath();
    this.ctx.strokeStyle = '#ff3070';
    this.ctx.lineWidth = this.m;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - tx, this.y - ty);
    this.ctx.stroke();
  }

  progress() {
    this.x += this.vx;
    this.y += this.vy;
  }

  accelerate(g) {
    const v = Math.sqrt(this.vx ** 2 + (this.vy + g) ** 2)
    this.vy = v < this.maxv() ? this.vy + g : this.vy
  }

  maxv() {
    return 40 + this.m * 3;
  }

  create() {
    this.x = this.setup.x();
    this.y = this.setup.y();
    this.m = this.setup.m();
    this.vx = this.setup.vx() * (4 - this.m);
    this.vy = this.setup.vy();
  }
}

class Rain {
  constructor(ctx, canv, droplets, setup = {}) {
    this.ctx = ctx;
    this.h = canv.height;
    this.w = canv.width;

    this.droplets = droplets;

    this.wind = setup.wind ? setup.wind : 0;
    this.g = setup.g ? setup.g : 2;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.droplets.forEach(drop => drop.draw());
  }

  progress() {
    this.droplets.forEach(drop => {
      drop.progress();
      drop.accelerate(this.g)
      if (drop.y > this.h + 200)
        drop.create();
    });
  }

  animate() {
    this.progress();
    this.draw();
  }

  init() {
    this.droplets.forEach(drop => drop.create());
  }

  loop() {
    this.init();
    setInterval(() => this.animate(), 20);
  }
}