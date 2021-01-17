import { writeFile } from 'fs'

import Serializer from 'serializers/Serializer'
import Canvas from 'types/Canvas'

export default abstract class AbstractRenderer {
  width: number
  height: number

  constructor (width: number, height: number) {
    this.width = width
    this.height = height
  }

  abstract generateCanvas(): Canvas

  exportToFile (serializer: Serializer, path: string) {
    const canvas: Canvas = this.generateCanvas()
    const renderString: string = serializer.render(canvas)

    writeFile(path, renderString, error => {
      if (error) {
        console.log('Render failed with error', error)
      } else {
        console.log(`Render exported to "${path}"`)
      }
    })
  }
}
