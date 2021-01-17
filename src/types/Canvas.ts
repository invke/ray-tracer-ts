import { times } from 'lodash'

import Colour from 'types/Colour'
// import PpmSerializer from 'serializers/PpmSerializer'

export default class Canvas {
  width: number
  height: number
  pixels: Array<Array<Colour>>

  constructor (width: number, height: number, fill: Colour = null) {
    this.width = width
    this.height = height

    // initialize pixel grid to black
    this.pixels = times(width, () => {
      return times(height, () => {
        return fill || Colour.Black()
      })
    })
  }

  getPixel (x: number, y: number) { return this.pixels[x][y] }

  setPixel (x: number, y: number, colour: Colour) {
    if (x < 0 || x >= this.pixels.length) return
    if (y < 0 || y >= this.pixels[x].length) return

    this.pixels[x][y] = colour
  }

  // toPpm () {
  //   const ppmSerializer = new PpmSerializer(this)
  //   ppmSerializer.render()
  // }
}
