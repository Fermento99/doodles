// Paweł Kajanek

window.onload = () => {
  const canvas = document.getElementById("canv");

  canvas.width = screen.height * .7;
  canvas.height = screen.height * .7;

  const game = new GameController(canvas, 100, 100);
  game.draw();

  document.getElementById("start").onclick = (e) => {
    e.target.innerText = e.target.innerText === 'Start' ? 'Stop' : 'Start';

    game.start();
  }

  game.loop()
}