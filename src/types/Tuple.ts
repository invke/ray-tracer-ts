import { EPSILON } from 'parameters'

export default class Tuple {
  readonly x: number
  readonly y: number
  readonly z: number
  readonly w: number

  static ZeroPoint (): Tuple { return Tuple.Point(0, 0, 0) }
  static Point (x: number, y: number, z: number): Tuple {
    return new Tuple(x, y, z, 1)
  }

  static ZeroVector (): Tuple { return Tuple.Vector(0, 0, 0) }
  static Vector (x: number, y: number, z: number): Tuple {
    return new Tuple(x, y, z, 0)
  }

  constructor (x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  get isPoint (): boolean { return this.w === 1.0 }

  get isVector (): boolean { return !this.isPoint }

  get magnitude (): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) +
      Math.pow(this.z, 2) + Math.pow(this.w, 2)
    )
  }

  equals (anotherTuple: this): boolean {
    return (
      Math.abs(this.x - anotherTuple.x) < EPSILON &&
      Math.abs(this.y - anotherTuple.y) < EPSILON &&
      Math.abs(this.z - anotherTuple.z) < EPSILON &&
      Math.abs(this.w - anotherTuple.w) < EPSILON
    )
  }

  add (anotherTuple: this): this {
    return new (<any> this.constructor)(
      this.x + anotherTuple.x, this.y + anotherTuple.y,
      this.z + anotherTuple.z, this.w + anotherTuple.w
    )
  }

  subtract (anotherTuple: this): this {
    return new (<any> this.constructor)(
      this.x - anotherTuple.x, this.y - anotherTuple.y,
      this.z - anotherTuple.z, this.w - anotherTuple.w
    )
  }

  negate (): this {
    return new (<any> this.constructor)().subtract(this)
  }

  multiply (scalar: number): this {
    return new (<any> this.constructor)(
      this.x * scalar, this.y * scalar,
      this.z * scalar, this.w * scalar
    )
  }

  normalize (): this {
    return new (<any> this.constructor)(
      this.x / this.magnitude,
      this.y / this.magnitude,
      this.z / this.magnitude,
      this.w / this.magnitude
    )
  }

  dot (anotherTuple: this): number {
    return (
      this.x * anotherTuple.x +
      this.y * anotherTuple.y +
      this.z * anotherTuple.z +
      this.w * anotherTuple.w
    )
  }

  cross (anotherTuple: this): this {
    return new (<any> this.constructor)(
      this.y * anotherTuple.z - this.z * anotherTuple.y,
      this.z * anotherTuple.x - this.x * anotherTuple.z,
      this.x * anotherTuple.y - this.y * anotherTuple.x,
      0
    )
  }
}
