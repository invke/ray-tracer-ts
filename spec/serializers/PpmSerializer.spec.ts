import { last } from 'lodash'
import heredoc from 'heredocument'

import Canvas from 'types/Canvas'
import Colour from 'types/Colour'
import PpmSerializer from 'serializers/PpmSerializer'

describe('PpmSerializer', () => {
  let serializer: PpmSerializer

  describe('#render', () => {
    let ppmString: string
    let ppmHeader: string
    let ppmBody: string

    describe('with a small canvas', () => {
      beforeEach(() => {
        const canvas = new Canvas(5, 3)
        canvas.setPixel(0, 0, new Colour(1.5, 0, 0))
        canvas.setPixel(2, 1, new Colour(0, 0.5, 0))
        canvas.setPixel(4, 2, new Colour(-0.5, 0, 1))

        serializer = new PpmSerializer(canvas)

        ppmString = serializer.render()
        const ppmLines = ppmString.split('\n')
        ppmHeader = ppmLines.slice(0, 3).join('\n')
        ppmBody = ppmLines.slice(3).join('\n')
      })

      it('assigns the header correctly', () => {
        expect(ppmHeader).toEqual(heredoc`
          P3
          5 3
          255`
        )
      })

      it('assigns the body from the pixels rgb values', () => {
        expect(ppmBody).toEqual(heredoc`
          255 0 0 0 0 0 0 0 0 0 0 0 0 0 0
          0 0 0 0 0 0 0 128 0 0 0 0 0 0 0
          0 0 0 0 0 0 0 0 0 0 0 0 0 0 255
          `
        )
      })

      it('terminates with a newline character', () => {
        expect(last(ppmBody)).toEqual('\n')
      })
    })

    describe('with a wide canvas', () => {
      beforeEach(() => {
        const canvas = new Canvas(10, 2, new Colour(1, 0.8, 0.6))
        serializer = new PpmSerializer(canvas)

        ppmString = serializer.render()
        const ppmLines = ppmString.split('\n')
        ppmBody = ppmLines.slice(3).join('\n')
      })

      it('assigns the body, splitting lines that are going to exceed 70 characters', () => {
        expect(ppmBody).toEqual(heredoc`
          255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204
          153 255 204 153 255 204 153 255 204 153 255 204 153
          255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204
          153 255 204 153 255 204 153 255 204 153 255 204 153
          `
        )
      })

      it('terminates with a newline character', () => {
        expect(last(ppmBody)).toEqual('\n')
      })
    })
  })
})
