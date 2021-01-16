import { EPSILON } from 'parameters'

export default class Tuple {
  readonly x: number
  readonly y: number
  readonly z: number
  readonly w: number

  static ZeroPoint () { return Tuple.Point(0, 0, 0) }
  static Point (x: number, y: number, z: number) {
    return new Tuple(x, y, z, 1)
  }

  static ZeroVector () { return Tuple.Vector(0, 0, 0) }
  static Vector (x: number, y: number, z: number) {
    return new Tuple(x, y, z, 0)
  }

  constructor (x: number, y: number, z: number, w: number) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  get isPoint () { return this.w === 1.0 }

  get isVector () { return !this.isPoint }

  get magnitude () {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) +
      Math.pow(this.z, 2) + Math.pow(this.w, 2)
    )
  }

  equals (anotherTuple: Tuple) {
    return (
      Math.abs(this.x - anotherTuple.x) < EPSILON &&
      Math.abs(this.y - anotherTuple.y) < EPSILON &&
      Math.abs(this.z - anotherTuple.z) < EPSILON &&
      Math.abs(this.w - anotherTuple.w) < EPSILON
    )
  }

  add (anotherTuple: Tuple) {
    return new Tuple(
      this.x + anotherTuple.x, this.y + anotherTuple.y,
      this.z + anotherTuple.z, this.w + anotherTuple.w
    )
  }

  subtract (anotherTuple: Tuple) {
    return new Tuple(
      this.x - anotherTuple.x, this.y - anotherTuple.y,
      this.z - anotherTuple.z, this.w - anotherTuple.w
    )
  }

  negate () { return Tuple.ZeroVector().subtract(this) }

  multiply (scalar: number) {
    return new Tuple(
      this.x * scalar, this.y * scalar,
      this.z * scalar, this.w * scalar
    )
  }

  normalize () {
    return new Tuple(
      this.x / this.magnitude,
      this.y / this.magnitude,
      this.z / this.magnitude,
      this.w / this.magnitude
    )
  }

  dot (anotherTuple: Tuple) {
    return (
      this.x * anotherTuple.x +
      this.y * anotherTuple.y +
      this.z * anotherTuple.z +
      this.w * anotherTuple.w
    )
  }

  cross (anotherTuple: Tuple) {
    return Tuple.Vector(
      this.y * anotherTuple.z - this.z * anotherTuple.y,
      this.z * anotherTuple.x - this.x * anotherTuple.z,
      this.x * anotherTuple.y - this.y * anotherTuple.x
    )
  }
}
