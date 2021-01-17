import { range, last, clamp } from 'lodash'
import heredoc from 'heredocument'

import Canvas from 'types/Canvas'
import Colour from 'types/Colour'
import Serializer from './Serializer'

const MAXIMUM_LINE_LENGTH = 70

export default class PpmSerializer implements Serializer {
  canvas: Canvas
  colourSpace: number

  constructor (colourSpace: number = 255) {
    this.colourSpace = colourSpace
  }

  render (canvas: Canvas): string {
    this.canvas = canvas
    return `${this.header()}\n${this.body()}\n`
  }

  private header (): string {
    return heredoc`
      P3
      ${this.canvas.width.toString()} ${this.canvas.height.toString()}
      ${this.colourSpace.toString()}`
  }

  private body (): string {
    const rowsLines = range(this.canvas.height).map(y =>
      this.bodyLinesForPixelRow(y)
    )

    return rowsLines.join('\n')
  }

  private bodyLinesForPixelRow (y: number): string {
    // each line of the ppm body corresponds to a row of the canvas
    const pixelsValues = this.pixelRowsValues(y)

    const lines = []
    pixelsValues.forEach(pixelsValue => {
      if (lines.length === 0 || last(lines).length > MAXIMUM_LINE_LENGTH - 4) {
        lines.push(`${pixelsValue}`)
      } else {
        lines[lines.length - 1] += ` ${pixelsValue}`
      }
    })

    return lines.join('\n')
  }

  private pixelRowsValues (y: number): Array<Array<number>> {
    const pixelsValues = []

    range(this.canvas.width).forEach(x => {
      const pixelsValue = this.pixelsValues(this.canvas.getPixel(x, y))
      pixelsValues.push(...pixelsValue)
    })

    return pixelsValues
  }

  private pixelsValues (pixel: Colour): Array<number> {
    return [
      this.pixelChannelToColourSpace(pixel.red),
      this.pixelChannelToColourSpace(pixel.green),
      this.pixelChannelToColourSpace(pixel.blue)
    ]
  }

  private pixelChannelToColourSpace (channel: number): number {
    const clampedChannel = clamp(channel, 0, 1)
    return Math.round(clampedChannel * this.colourSpace)
  }
}
