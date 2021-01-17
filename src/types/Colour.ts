import Tuple from './Tuple'

export default class Colour extends Tuple {
  static Black () { return new Colour(0, 0, 0) }
  static White () { return new Colour(1, 1, 1) }
  static Red () { return new Colour(1, 0, 0) }
  static Green () { return new Colour(0, 1, 0) }
  static Blue () { return new Colour(0, 0, 1) }

  constructor (r: number, g: number, b: number) {
    super(r, g, b, 1)
  }

  get r (): number { return this.x }
  get g (): number { return this.y }
  get b (): number { return this.z }

  get red (): number { return this.r }
  get green (): number { return this.g }
  get blue (): number { return this.b }

  // TODO: Not totally sure how overloading w/ signatures works right now.
  // multiply (arg: number): this
  // multiply (arg: this): this
  multiply (arg: any): this {
    if (arg instanceof Colour) {
      // Perform the Hadamard (or Schur) product, the piecewise multiplication
      // of the two colours components.
      const anotherColour: Colour = arg as Colour
      return new (<any> this.constructor)(
        this.r * anotherColour.r,
        this.g * anotherColour.g,
        this.b * anotherColour.b
      )
    } else if (typeof arg === 'number') {
      const scalar: number = arg as number
      return super.multiply(scalar)
    } else {
      throw TypeError('')
    }
  }
}
