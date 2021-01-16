import { EPSILON } from 'parameters'

declare global {
  namespace jest {
    // eslint-disable-next-line no-unused-vars
    interface Matchers<R> {
      toApproximatelyEqual (expected: number): jest.CustomMatcherResult
    }
  }
}

expect.extend({
  toApproximatelyEqual (received: number, expected: number): jest.CustomMatcherResult {
    const pass = Math.abs(received - expected) < EPSILON
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be approximately equal to ${expected}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be approximately equal to ${expected}`,
        pass: false
      }
    }
  }
})
