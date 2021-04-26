const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// canvas setup
canvas.width = 600;
canvas.height = 600;
// globals
let radius = 3;
let count = 10;
let connections = 3;
let speed = 4;
let conrad = 200;
let points = [];


class Point {
  constructor(x, y, dx, dy, border) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.xBorder = border.width
    this.yBorder = border.height
  }

  checkCollision() {
    if (this.x <= 0 || this.x >= this.xBorder){
      this.dx *= -1;
    }
    if (this.y <= 0 || this.y >= this.yBorder){
      this.dy *= -1;
    }
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    this.checkCollision();
  }

  distance(point) {
    return Math.pow(this.x-point.x, 2) + Math.pow(this.y-point.y, 2);
  }
}

// animation setup

function setup() {
  points = [];
  if (document.getElementById('points').value)
    count = document.getElementById('points').value
  if (document.getElementById('connections').value)
    conrad = document.getElementById('connections').value
  if (document.getElementById('speed').value)
    speed = document.getElementById('speed').value

  for(let i = 0; i < count; i++){
    x = Math.random() * (canvas.width-2) + 1;
    y = Math.random() * (canvas.height-2) + 1;
    dx = (Math.random()-0.5) * speed;
    dy = (Math.random()-0.5) * speed;
    points.push(new Point(x, y, dx, dy, canvas))
  }
}

// animation

// old version
// function drawConnections(p){
//   neigh = [];
//   points.forEach(e => neigh.push({'point': e, 'distance': e.distance(p)}));
//   neigh.sort((a, b) => a.distance - b.distance);

//   for(let i = 1; i <= connections; i++){
//     ctx.beginPath();
//     ctx.style = "green";
//     ctx.moveTo(p.x, p.y);
//     ctx.lineTo(neigh[i].point.x, neigh[i].point.y);
//     ctx.stroke();
//   }
// }

function drawConnections2(tab) {
  for(let i = 0; i < count; i++) {
    for(let j = i+1; j < count; j++) {
      if(tab[i].distance(tab[j])<conrad*conrad){
        ctx.beginPath();
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 2;
        ctx.moveTo(tab[i].x, tab[i].y);
        ctx.lineTo(tab[j].x, tab[j].y);
        ctx.stroke();
      }
    }
  }
}

function drawPoint(p) {
  ctx.beginPath();
  ctx.fillStyle = 'gray';
  ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, true);
  ctx.fill();
  p.move()
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // old version
  // points.forEach(p => drawConnections(p)) 
  drawConnections2(points)
  points.forEach(p => drawPoint(p));
}

setup()
animate();



// ****** RESET ******

let reset = document.getElementById('reset');
reset.addEventListener('click', () => setup());