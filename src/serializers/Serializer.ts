import Canvas from 'types/Canvas'

export default interface Serializer {
  render(canvas: Canvas): string
}
