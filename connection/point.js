export class Point {
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

