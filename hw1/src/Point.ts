type D<T> = (p2: T, p1: T) => T;

export class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y; 
  }

  toString () {
    return `(${this.x}, ${this.y})`
  }

  distance(x: Point): number;
  distance(x: number, y: number): number;
  distance(): number;

  distance(x?: number | Point, y?: number): number {
    const {hypot} = Math;
    
    const x2 = (x as Point)?.x ?? x as number;
    const y2 = (x as Point)?.y ?? y;

    const d: D<number> = (p2 = 0, p1 = 0) => p2-p1;

   return hypot(d(x2, this.x), d(y2, this.y));
  }
}
