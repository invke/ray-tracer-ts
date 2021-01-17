import Tuple from 'types/Tuple'
import { EPSILON } from 'parameters'

describe('Tuple', () => {
  let tuple: Tuple

  describe('with w = 1.0', () => {
    beforeEach(() => {
      tuple = new Tuple(4.3, -4.2, 3.1, 1.0)
    })

    it('assigns the axis\'', () => {
      expect(tuple.x).toEqual(4.3)
      expect(tuple.y).toEqual(-4.2)
      expect(tuple.z).toEqual(3.1)
      expect(tuple.w).toEqual(1.0)
    })

    it('is a point', () => {
      expect(tuple.isPoint).toBe(true)
    })

    it('is not a vector', () => {
      expect(tuple.isVector).toBe(false)
    })
  })

  describe('with w = 0.0', () => {
    beforeEach(() => {
      tuple = new Tuple(4.3, -4.2, 3.1, 0.0)
    })

    it('assigns the axis\'', () => {
      expect(tuple.x).toEqual(4.3)
      expect(tuple.y).toEqual(-4.2)
      expect(tuple.z).toEqual(3.1)
      expect(tuple.w).toEqual(0.0)
    })

    it('is not a point', () => {
      expect(tuple.isPoint).toBe(false)
    })

    it('is a vector', () => {
      expect(tuple.isVector).toBe(true)
    })
  })

  describe('#equals', () => {
    let result: boolean
    beforeEach(() => {
      tuple = new Tuple(4.3, -4.2, 3.1, 1.0)
    })

    it('returns true if the x, y, z and are both points', () => {
      result = tuple.equals(new Tuple(4.3, -4.2, 3.1, 1.0))
      expect(result).toBe(true)
    })

    it('returns false if the x, y, z are equal but one is a point the other a vector', () => {
      result = tuple.equals(new Tuple(4.3, -4.2, 3.1, 0.0))
      expect(result).toBe(false)
    })
  })

  describe('#add', () => {
    let result: Tuple
    beforeEach(() => {
      tuple = new Tuple(3, -2, 5, 1)
      result = tuple.add(new Tuple(-2, 3, 1, 0))
    })

    it('returns a tuple from the addition of their components', () => {
      expect(result.x).toEqual(1)
      expect(result.y).toEqual(1)
      expect(result.z).toEqual(6)
      expect(result.w).toEqual(1)
    })
  })

  describe('#subtract', () => {
    let result: Tuple

    describe('subtracting two points', () => {
      beforeEach(() => {
        tuple = Tuple.Point(3, 2, 1)
        result = tuple.subtract(Tuple.Point(5, 6, 7))
      })

      it('returns a vector', () => {
        expect(result.isVector).toBe(true)
      })

      it('subtracts components pairwise', () => {
        expect(result.x).toEqual(-2)
        expect(result.y).toEqual(-4)
        expect(result.z).toEqual(-6)
      })
    })

    describe('subtracting a vector from a point', () => {
      beforeEach(() => {
        tuple = Tuple.Point(3, 2, 1)
        result = tuple.subtract(Tuple.Vector(5, 6, 7))
      })

      it('returns a point', () => {
        expect(result.isPoint).toBe(true)
      })

      it('subtracts components pairwise', () => {
        expect(result.x).toEqual(-2)
        expect(result.y).toEqual(-4)
        expect(result.z).toEqual(-6)
      })
    })

    describe('subtracting two vectors', () => {
      beforeEach(() => {
        tuple = Tuple.Vector(3, 2, 1)
        result = tuple.subtract(Tuple.Vector(5, 6, 7))
      })

      it('returns a vector', () => {
        expect(result.isVector).toBe(true)
      })

      it('subtracts components pairwise', () => {
        expect(result.x).toEqual(-2)
        expect(result.y).toEqual(-4)
        expect(result.z).toEqual(-6)
      })
    })

    describe('subtracting a vector from the zero vector', () => {
      beforeEach(() => {
        tuple = Tuple.Point(1, -2, 3)
        result = Tuple.Vector().subtract(tuple)
      })

      it('returns a vector', () => {
        expect(result.isVector).toBe(true)
      })

      it('inverts the sign of the components', () => {
        expect(result.x).toEqual(-1)
        expect(result.y).toEqual(2)
        expect(result.z).toEqual(-3)
      })
    })
  })

  describe('#negate', () => {
    let result: Tuple

    beforeEach(() => {
      tuple = new Tuple(1, -2, 3, -4)
      result = tuple.negate()
    })

    it('inverts the sign of the components', () => {
      expect(result.x).toEqual(-1)
      expect(result.y).toEqual(2)
      expect(result.z).toEqual(-3)
      expect(result.w).toEqual(4)
    })
  })

  describe('#mutliply', () => {
    let result: Tuple

    describe('multiplying a tuple by a scalar', () => {
      beforeEach(() => {
        tuple = new Tuple(1, -2, 3, -4)
        result = tuple.multiply(3.5)
      })

      it('multiplys the tuple components piecewise', () => {
        expect(result.x).toEqual(3.5)
        expect(result.y).toEqual(-7)
        expect(result.z).toEqual(10.5)
        expect(result.w).toEqual(-14)
      })
    })

    describe('multilying a tuple by a fraction', () => {
      beforeEach(() => {
        tuple = new Tuple(1, -2, 3, -4)
        result = tuple.multiply(0.5)
      })

      it('multiplys the tuple components piecewise', () => {
        expect(result.x).toEqual(0.5)
        expect(result.y).toEqual(-1)
        expect(result.z).toEqual(1.5)
        expect(result.w).toEqual(-2)
      })
    })
  })

  describe('#magnitude', () => {
    it('returns 1 with components (1, 0, 0)', () => {
      tuple = Tuple.Vector(1, 0, 0)
      expect(tuple.magnitude).toEqual(1)
    })

    it('returns 1 with components (0, 1, 0)', () => {
      tuple = Tuple.Vector(0, 1, 0)
      expect(tuple.magnitude).toEqual(1)
    })

    it('returns 1 with components (0, 0, 1)', () => {
      tuple = Tuple.Vector(0, 0, 1)
      expect(tuple.magnitude).toEqual(1)
    })

    it('returns 1 with components (1, 2, 3)', () => {
      tuple = Tuple.Vector(1, 2, 3)
      expect(tuple.magnitude).toEqual(Math.sqrt(14))
    })

    it('returns 1 with components (-1, -2, -3)', () => {
      tuple = Tuple.Vector(-1, -2, -3)
      expect(tuple.magnitude).toEqual(Math.sqrt(14))
    })
  })

  describe('#normalize', () => {
    let result: Tuple

    it('returns (1, 0, 0) with components (4, 0, 0)', () => {
      tuple = Tuple.Vector(4, 0, 0)
      result = tuple.normalize()
      expect(result.x).toEqual(1)
      expect(result.y).toEqual(0)
      expect(result.z).toEqual(0)
    })

    it('returns (0.26726, 0.26726, 0.26726) with components (1, 2, 3)', () => {
      tuple = Tuple.Vector(1, 2, 3)
      result = tuple.normalize()
      expect(Math.abs(result.x - 0.26726) < EPSILON).toBe(true)
      expect(Math.abs(result.y - 0.53452) < EPSILON).toBe(true)
      expect(Math.abs(result.z - 0.80178) < EPSILON).toBe(true)
    })

    it('returns a vector with magnituted 1', () => {
      tuple = Tuple.Vector(1, 2, 3)
      result = tuple.normalize()
      expect(result.magnitude).toEqual(1)
    })
  })

  describe('#dot', () => {
    let result: number

    describe('for two tuples (1, 2, 3) and (2, 3, 4)', () => {
      beforeEach(() => {
        tuple = Tuple.Vector(1, 2, 3)
        result = tuple.dot(Tuple.Vector(2, 3, 4))
      })

      it('returns 20', () => {
        expect(result).toEqual(20)
      })
    })
  })

  describe('#cross', () => {
    let result: Tuple
    const oneTuple = Tuple.Vector(1, 2, 3)
    const anotherTuple = Tuple.Vector(2, 3, 4)

    describe('for the cross product of (1, 2, 3) with (2, 3, 4)', () => {
      beforeEach(() => {
        result = oneTuple.cross(anotherTuple)
      })

      it('returns (-1, 2, -1)', () => {
        expect(result.x).toEqual(-1)
        expect(result.y).toEqual(2)
        expect(result.z).toEqual(-1)
      })
    })

    describe('for the cross product of (2, 3, 4) with (1, 2, 3)', () => {
      beforeEach(() => {
        result = anotherTuple.cross(oneTuple)
      })

      it('returns (1, -2, 1)', () => {
        expect(result.x).toEqual(1)
        expect(result.y).toEqual(-2)
        expect(result.z).toEqual(1)
      })
    })
  })

  describe('static methods', () => {
    describe('#Point', () => {
      beforeEach(() => {
        tuple = Tuple.Point(4.3, -4.2, 3.1)
      })

      it('returns a point tuple', () => {
        expect(tuple.isPoint).toBe(true)
      })

      it('assigns axis\'', () => {
        expect(tuple.x).toEqual(4.3)
        expect(tuple.y).toEqual(-4.2)
        expect(tuple.z).toEqual(3.1)
      })
    })

    describe('#Vector', () => {
      beforeEach(() => {
        tuple = Tuple.Vector(4.3, -4.2, 3.1)
      })

      it('returns a vector tuple', () => {
        expect(tuple.isVector).toBe(true)
      })

      it('assigns axis\'', () => {
        expect(tuple.x).toEqual(4.3)
        expect(tuple.y).toEqual(-4.2)
        expect(tuple.z).toEqual(3.1)
      })
    })
  })
})
