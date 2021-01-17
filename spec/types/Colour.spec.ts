import Colour from 'types/Colour'

describe('Colour', () => {
  let colour: Colour

  describe('components', () => {
    beforeEach(() => {
      colour = new Colour(-0.5, 0.4, 1.7)
    })

    it('has a red component', () => {
      expect(colour.red).toEqual(-0.5)
    })

    it('has a green component', () => {
      expect(colour.green).toEqual(0.4)
    })

    it('has a blue component', () => {
      expect(colour.blue).toEqual(1.7)
    })
  })

  describe('#add', () => {
    it('returns a colour from the addition of their components', () => {
      const colour = new Colour(0.9, 0.6, 0.75)
      const result = colour.add(new Colour(0.7, 0.1, 0.25))

      expect(result.red).toEqual(1.6)
      expect(result.green).toEqual(0.7)
      expect(result.blue).toEqual(1.0)
    })
  })

  describe('#subtract', () => {
    it('returns a colour from the subtraction of their components', () => {
      const colour = new Colour(0.9, 0.6, 0.75)
      const result = colour.subtract(new Colour(0.7, 0.1, 0.25))

      expect(result.red).toApproximatelyEqual(0.2)
      expect(result.green).toApproximatelyEqual(0.5)
      expect(result.blue).toApproximatelyEqual(0.5)
    })
  })

  describe('#multiply', () => {
    describe('mutiplying a colour by a scalar', () => {
      it('returns the colour with each component multiplied by the scalar', () => {
        const colour = new Colour(0.2, 0.3, 0.4)
        const result = colour.multiply(2)

        expect(result.red).toApproximatelyEqual(0.4)
        expect(result.green).toApproximatelyEqual(0.6)
        expect(result.blue).toApproximatelyEqual(0.8)
      })
    })

    describe('multiplying colours together', () => {
      it('returns the colour from the multiplication of their components', () => {
        const colour = new Colour(1, 0.2, 0.4)
        const result = colour.multiply(new Colour(0.9, 1, 0.1))

        expect(result.red).toApproximatelyEqual(0.9)
        expect(result.green).toApproximatelyEqual(0.2)
        expect(result.blue).toApproximatelyEqual(0.04)
      })
    })
  })
})
