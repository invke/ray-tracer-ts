import { floor } from 'lodash'

import Canvas from 'types/Canvas'
import Colour from 'types/Colour'
import Tuple from 'types/Tuple'
import AbstractRenderer from './AbstractRenderer'

export default class ProjectileRenderer extends AbstractRenderer {
  // TODO: what's the best way of not duplicating this signature (a class?)
  config: {
    initialVelocity: Tuple
    gravity: number // subtracted downwards from the velocity each tick
    wind: Tuple // added to the velocity each tick
    tickPeriod: number // time between simulation ticks in seconds
  }

  constructor (
    width: number,
    height: number,
    config: {
      initialVelocity: Tuple
      gravity: number
      wind: Tuple
      tickPeriod: number
    }
  ) {
    super(width, height)
    this.config = config
  }

  get (): number { return this.config.gravity }

  generateCanvas (): Canvas {
    const canvas: Canvas = new Canvas(this.width, this.height)

    let position: Tuple = Tuple.Point(0, 1, 0)
    let velocity: Tuple = this.config.initialVelocity

    while (position.y > 0) {
      // calculate the next velocity
      velocity = velocity
        .add(Tuple.Vector(0, -this.config.gravity, 0))
        .add(this.config.wind)

      // adjust the position
      position = position.add(velocity.multiply(this.config.tickPeriod))

      canvas.setPixel(
        floor(position.x),
        canvas.height - floor(position.y),
        Colour.Red()
      )
    }

    return canvas
  }
}
