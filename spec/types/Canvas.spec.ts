import Canvas from 'types/Canvas'
import Colour from 'types/Colour'

describe('Canvas', () => {
  let canvas: Canvas

  describe('#constructor', () => {
    beforeEach(() => {
      canvas = new Canvas(10, 20)
    })

    it('assigns the width', () => {
      expect(canvas.width).toEqual(10)
    })

    it('assigns the height', () => {
      expect(canvas.height).toEqual(20)
    })

    it('generates a grid of black pixels', () => {
      expect(canvas.pixels.length).toEqual(10)
      canvas.pixels.forEach(column => {
        expect(column.length).toEqual(20)

        column.forEach(pixel => {
          expect(pixel.red).toEqual(0)
          expect(pixel.green).toEqual(0)
          expect(pixel.blue).toEqual(0)
        })
      })
    })
  })

  describe('#getPixel', () => {
    it('returns the pixel at the index in the pixels array', () => {
      canvas = new Canvas(10, 20)
      canvas.pixels[2][3] = Colour.Red()
      expect(canvas.getPixel(2, 3)).toEqual(Colour.Red())
    })
  })

  describe('#setPixel', () => {
    it('sets the pixel at the index in the pixels array', () => {
      canvas = new Canvas(10, 20)
      canvas.setPixel(2, 3, Colour.Red())
      expect(canvas.pixels[2][3]).toEqual(Colour.Red())
    })
  })
})
