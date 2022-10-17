import { Point } from './Point';

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];
  abstract getType(): string;

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);

  constructor(points: Point[], color?: string, filled?: boolean) {
    if(typeof color !== 'string' && typeof color !== 'string') {
      this.color = 'green';
      this.filled = true;
    } else {
      this.color = color;
      this.filled = filled;
    }
    this.points = points;
    this.checkNumberOfPoints();
  }

  private checkNumberOfPoints () {
    if (!this.points || this.points.length < 3) throw new Error('should fail to be created with 2 points');
  }
  
  public toString() {
    const points = this.points.join(', ');
    const filled = this.filled ? '' : 'not ';

    return `A Shape with color of ${this.color} and ${filled}filled. Points: ${points}.`;
  }

  public getPerimeter() {    
    return this.points.reduce((acc, cur, i) => acc + cur.distance(this.points[i+1]), 0)
  }
}
