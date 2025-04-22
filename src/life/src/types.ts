interface Drawable {
  drawFrame(): void;
}

interface Point {
  x: number;
  y: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

export type { Drawable, Point, Color };
