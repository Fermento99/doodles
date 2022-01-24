
window.onload = () => {
  canv.width = screen.width * .7;
  canv.height = screen.height * .7;

  console.log(canv);
  const ctx = canv.getContext('2d');

  ctx.clearRect(0, 0, canv.width, canv.height);

  let dropSetup = {
    x: () => randRange(-100, canv.width + 100),
    y: () => randRange(-2 * canv.height, 0),
    vx: () => randGauss(4, 20),
    vy: () => randRange(0, 10),
    m: () => randRange(2, 4),
  }

  const drops = [...Array(200)].map(e => new Droplet(ctx, dropSetup));
  const rain = new Rain(ctx, canv, drops);
  rain.loop();
}
