// Paweł Kajanek

class GameController {
  constructor(canvas, rows, columns,random=false, aliveColor = "#000000", deadColor = "#ffffff") {
    this.unitHeight = canvas.height / rows;
    this.unitWidth = canvas.width / columns;
    this.rows = rows;
    this.columns = columns;
    this.ctx = canvas.getContext('2d');
    canvas.onclick = e => this.click(e);

    this.aliveColor = aliveColor;
    this.deadColor = deadColor;

    this.cells = [];
    this.tempCells = [];
    this.neighboours = [];

    this.init(random);

    this.running = false;
  }

  init(random) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const index = this.index(i, j);

        switch (i) {
          case 0:
            switch (j) {
              case 0:
                this.neighboours.push([
                  index + 1,
                  index + this.columns,
                  index + this.columns + 1
                ]);
                break;
              case this.columns - 1:
                this.neighboours.push([
                  index - 1,
                  index + this.columns - 1,
                  index + this.columns
                ]);
                break;
              default:
                this.neighboours.push([
                  index - 1,
                  index + 1,
                  index + this.columns - 1,
                  index + this.columns,
                  index + this.columns + 1
                ]);
            }
            break;
          case this.rows - 1:
            switch (j) {
              case 0:
                this.neighboours.push([
                  index - this.columns,
                  index - this.columns + 1,
                  index + 1
                ]);
                break;
              case this.columns - 1:
                this.neighboours.push([
                  index - this.columns - 1,
                  index - this.columns,
                  index - 1
                ]);
                break;
              default:
                this.neighboours.push([
                  index - this.columns - 1,
                  index - this.columns,
                  index - this.columns + 1,
                  index - 1,
                  index + 1
                ]);
            }
            break;
          default:
            switch (j) {
              case 0:
                this.neighboours.push([
                  index - this.columns,
                  index - this.columns + 1,
                  index + 1,
                  index + this.columns,
                  index + this.columns + 1,
                ]);
                break;
              case this.columns - 1:
                this.neighboours.push([
                  index - this.columns - 1,
                  index - this.columns,
                  index - 1,
                  index + this.columns - 1,
                  index + this.columns,
                ]);
                break;
              default:
                this.neighboours.push([
                  index - this.columns - 1,
                  index - this.columns,
                  index - this.columns + 1,
                  index - 1,
                  index + 1,
                  index + this.columns - 1,
                  index + this.columns,
                  index + this.columns + 1,
                ]);
            }
        }

        const val = random ? Math.floor(Math.random() * 2) : 0;
        this.cells.push(val);
        this.tempCells.push(val);
      }
    }
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const index = this.index(i, j);

        if (this.cells[index] === 1)
          this.ctx.fillStyle = this.aliveColor;
        else
          this.ctx.fillStyle = this.deadColor;

        this.ctx.fillRect(j * this.unitWidth, i * this.unitHeight, this.unitWidth, this.unitHeight);
      }
    }
  }

  proceed() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const index = this.index(i, j);
        
        let sum = 0;
        this.neighboours[index].forEach(neigbour => {
          sum += this.cells[neigbour];
        });

        this.tempCells[index] = sum === 3 || (sum === 2 && this.cells[index] === 1) ? 1 : 0;
      }
    }

    this.cells = this.tempCells.map(x => x);
  }

  loop() {
    setInterval(() => {
      if (this.running) {
        this.proceed();
        this.draw();
        console.log('tik');
      }
    }, 300)
  }


  index(i, j) {
    return i * this.columns + j;
  }

  start() {
    this.running = !this.running;
  }

  click(e) {
    const i = Math.floor(e.layerY / this.unitHeight);
    const j = Math.floor(e.layerX / this.unitWidth);
    const index = this.index(i, j);
    
    this.cells[index] = this.cells[index] === 1 ? 0 : 1;
    this.draw();
  }
}