export class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y; 
  }

  public toString () {
    return `(${this.x}, ${this.y})`
  }

  public distance(x: Point): number;
  public distance(x: number, y: number): number;
  public distance(): number;

  public distance(x?: unknown, y?: unknown): number {
    const {sqrt, pow} = Math;

    const xd = (x1: number, x2: number): number => pow((x2-x1), 2);
    const yd = (y1: number, y2: number): number => pow((y2-y1), 2);

    if(typeof x === 'number' && typeof y === 'number') return sqrt(xd(this.x, x) + yd(this.y, y));
    if (x instanceof Point) return sqrt(xd(this.x, x.x) + yd(this.y, x.y));
    return sqrt(xd(0, this.x) + yd(0, this.y));
  }
}
