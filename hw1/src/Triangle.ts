import { Point } from './point';
import { Shape } from './Shape';

export class Triangle extends Shape {
  constructor(points: Point[], color?: string, filled?: boolean);
  constructor(point1: Point, point2: Point, point3: Point);

  constructor(point1: unknown, point2: unknown, point3: unknown) {
    if(point1 instanceof Point && point2 instanceof Point && point3 instanceof Point) {
      super([point1, point2, point3]);
      this.points = [point1, point2, point3];
    }
  }

  toString() {
    const str = this.points.reduce((a, c, i) => a + `v${i + 1}=${c.toString()},`, '');
    
    return `Triangle[${str.slice(0, str.length - 1)}]`
  }

  getType() {
    const res = [
      +this.points[0].distance(this.points[1]).toFixed(1),
      +this.points[1].distance(this.points[2]).toFixed(1),
      +this.points[2].distance(this.points[0]).toFixed(1)
    ].filter((el, i, arr) => el % arr[(i+1) % 3]);
    
    if(res.length === 0) return 'equilateral triangle';
    if(res.length === 2) return 'isosceles triangle';
    return 'scalene triangle';
  }
}
