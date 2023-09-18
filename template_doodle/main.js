
const SCREEN_EPRCENTAGE = .7;

window.onload = () => {
  canv.width = screen.width * SCREEN_EPRCENTAGE;
  canv.height = screen.height * SCREEN_EPRCENTAGE;

  const ctx = canv.getContext('2d');

  ctx.clearRect(0, 0, canv.width, canv.height);
}
