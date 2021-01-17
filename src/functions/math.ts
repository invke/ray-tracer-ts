import { EPSILON } from 'parameters'

export function approx (a: number, b: number): boolean {
  return Math.abs(a - b) < EPSILON
}
