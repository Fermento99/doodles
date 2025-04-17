import { DisplayHandler } from './DisplayHandler';
import { Point, Drawable } from './types';

interface SimulationOptions {
  randomChance: number;
  cellWidth: number;
  cellHeight: number;
  gridWidth: number;
  fullWidth: boolean;
  gridHeight: number;
  fullHeight: boolean;
}

class Simulation implements Drawable {
  randomChance = 0.2;
  _displayHandler: DisplayHandler;
  _dimentions: Point;
  _cells: Point[];

  constructor(displayHandler: DisplayHandler) {
    displayHandler.drawHandler = (point: Point): void => {
      this.handleDraw(point);
    };

    this._displayHandler = displayHandler;
    this._dimentions = displayHandler.getMaxDimentions();
    this._cells = [];
  }

  drawFrame(): void {
    this.simulationStep();
    this.draw();
  }

  setOptions({
    randomChance,
    cellWidth,
    cellHeight,
    gridWidth,
    fullWidth,
    gridHeight,
    fullHeight,
  }: SimulationOptions): void {
    this.randomChance = randomChance;
    this._displayHandler.cellSize = { x: cellWidth, y: cellHeight };
    this._displayHandler.setSize({ x: fullWidth || gridWidth, y: fullHeight || gridHeight });
    this._dimentions = this._displayHandler.getMaxDimentions();
    this.randomize();
  }

  draw(): void {
    this._displayHandler.clear();

    this._cells.forEach(cell => {
      this._displayHandler.drawCell(cell);
    });
  }

  handleDraw(point: Point): void {
    this.swapCell(point);
    this.draw();
  }

  swapCell(point: Point): void {
    const cellIndex = this._cells.findIndex(cell => point.x === cell.x && point.y === cell.y);
    if (cellIndex === -1) {
      this._cells.push(point);
    } else {
      this._cells.splice(cellIndex, 1);
    }
  }

  randomize(): void {
    this._cells = [];

    for (let x = 0; x < this._dimentions.x; x++) {
      for (let y = 0; y < this._dimentions.y; y++) {
        if (Math.random() < this.randomChance) {
          this._cells.push({ x, y });
        }
      }
    }

    this.draw();
  }

  clear(): void {
    this._cells = [];

    this.draw();
  }

  simulationStep(): void {
    const nextGen: Cell[] = [];

    this._cells.forEach(oldCell => {
      const neighbours = this.getNeighbours(oldCell);
      neighbours.forEach(point => {
        const cell = nextGen.find(cell => cell.equals(point));

        if (cell) {
          cell.addNeighbour();
        } else {
          nextGen.push(new Cell(point));
        }
      });

      const nextCell = nextGen.find(cell => cell.equals(oldCell));

      if (nextCell) {
        nextCell.living = true;
      } else {
        nextGen.push(new Cell(oldCell, true));
      }
    });

    this._cells = [];
    nextGen.forEach(cell => {
      if (cell.neighbourCount === 3 || (cell.neighbourCount === 2 && cell.living)) {
        this._cells.push(cell.position);
      }
    });
  }

  getNeighbours(cell: Point): Point[] {
    const { x, y } = cell;
    const neighbours: Point[] = [];

    const xNotMin = x > 0;
    const xNotMax = x < this._dimentions.x - 1;
    const yNotMin = y > 0;
    const yNotMax = y < this._dimentions.y - 1;

    if (xNotMin) {
      if (yNotMin) {
        neighbours.push({ x: x - 1, y: y - 1 });
      }
      neighbours.push({ x: x - 1, y });
      if (yNotMax) {
        neighbours.push({ x: x - 1, y: y + 1 });
      }
    }

    if (xNotMax) {
      if (yNotMin) {
        neighbours.push({ x: x + 1, y: y - 1 });
      }
      neighbours.push({ x: x + 1, y });
      if (yNotMax) {
        neighbours.push({ x: x + 1, y: y + 1 });
      }
    }

    if (yNotMin) {
      neighbours.push({ x: x, y: y - 1 });
    }

    if (yNotMax) {
      neighbours.push({ x: x, y: y + 1 });
    }

    return neighbours;
  }
}

class Cell {
  position: Point;
  neighbourCount: number;
  living: boolean;

  constructor(position: Point, living = false) {
    this.position = position;
    this.neighbourCount = living ? 0 : 1;
    this.living = living;
  }

  addNeighbour(): void {
    this.neighbourCount++;
  }

  equals(other: Point): boolean {
    return this.position.x === other.x && this.position.y === other.y;
  }
}

export { Simulation };
