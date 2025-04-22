import { DisplayHandler } from './DisplayHandler';
import { Point, Drawable, Color } from './types';

interface SimulationOptions {
  randomChance: number;
  cellWidth: number;
  cellHeight: number;
  gridWidth: number;
  fullWidth: boolean;
  gridHeight: number;
  fullHeight: boolean;
  monochromatic: boolean;
}

class Simulation implements Drawable {
  randomChance = 0.2;
  _displayHandler: DisplayHandler;
  _dimentions: Point = { x: 10, y: 10 };
  _cells: Cell[];

  constructor(displayHandler: DisplayHandler) {
    displayHandler.setSize(this._dimentions);
    displayHandler.drawHandler = (point: Point): void => {
      this.handleDraw(point);
    };

    this._displayHandler = displayHandler;
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
    monochromatic,
  }: SimulationOptions): void {
    this.randomChance = randomChance;
    this._displayHandler.cellSize = { x: cellWidth, y: cellHeight };
    this._displayHandler.setSize({ x: fullWidth || gridWidth, y: fullHeight || gridHeight });
    this._displayHandler.monochromatic = monochromatic;

    this._dimentions = this._displayHandler.getDimentions();
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
    const cellIndex = this._cells.findIndex(cell => cell.isAt(point));
    if (cellIndex === -1) {
      const newCell = new Cell(point);
      newCell.randomizeColor();
      this._cells.push(newCell);
    } else {
      this._cells.splice(cellIndex, 1);
    }
  }

  randomize(): void {
    this._cells = [];

    for (let x = 0; x < this._dimentions.x; x++) {
      for (let y = 0; y < this._dimentions.y; y++) {
        if (Math.random() < this.randomChance) {
          const newCell = new Cell({ x, y });
          newCell.randomizeColor();
          this._cells.push(newCell);
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
    const nextGen = new Map<number, Cell>();

    this._cells.forEach(oldCell => {
      const oldCellId = this.getCellId(oldCell.position);
      const neighbours = this.getNeighbours(oldCell.position);

      neighbours.forEach(point => {
        const id = this.getCellId(point);
        const cell = nextGen.get(id);

        if (cell) {
          cell.addNeighbour(oldCell.color);
        } else {
          const newCell = new Cell(point);
          newCell.addNeighbour(oldCell.color);
          nextGen.set(id, newCell);
        }
      });

      const nextCell = nextGen.get(oldCellId);

      if (nextCell) {
        nextCell.living = true;
        nextCell.color = oldCell.color;
      } else {
        const newCell = new Cell(oldCell.position);
        newCell.living = true;
        newCell.color = oldCell.color;
        nextGen.set(oldCellId, newCell);
      }
    });

    this._cells = [];
    nextGen.forEach(cell => {
      const neighbourCount = cell.getNeighbourCount();
      if (neighbourCount === 3 || (neighbourCount === 2 && cell.living)) {
        cell.calculateColor();
        this._cells.push(cell);
      }
    });
  }

  getCellId(point: Point): number {
    return point.x * this._dimentions.x + point.y;
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
  neighbourColors: Color[];
  color: Color;
  living: boolean;

  constructor(position: Point) {
    this.position = position;
    this.neighbourColors = [];
    this.color = { r: 0, g: 0, b: 0 };
    this.living = false;
  }

  isAt({ x, y }: Point): boolean {
    return this.position.x === x && this.position.y === y;
  }

  addNeighbour(color: Color): void {
    this.neighbourColors.push(color);
  }

  randomizeColor(): void {
    this.color = {
      r: this._randomColorValue(),
      g: this._randomColorValue(),
      b: this._randomColorValue(),
    };
  }

  getNeighbourCount(): number {
    return this.neighbourColors.length;
  }

  calculateColor(): void {
    if (!this.living) {
      this.neighbourColors.forEach(({ r, g, b }) => {
        this.color.r += r;
        this.color.g += g;
        this.color.b += b;
      });

      const componentLength = this.neighbourColors.length;
      let component: keyof Color;
      for (component in this.color) {
        this.color[component] = Math.round(this.color[component] / componentLength);
      }
    }
  }

  _randomColorValue(): number {
    return Math.floor(Math.pow(Math.random() - 0.5, 2) * 4 * 190) + 63;
  }
}

export { Simulation, Cell };
