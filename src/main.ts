import AbstractRenderer from 'renderers/AbstractRenderer'
import ProjectileRenderer from 'renderers/ProjectileRenderer'
import PpmSerializer from 'serializers/PpmSerializer'
import Serializer from 'serializers/Serializer'
import Tuple from 'types/Tuple'

console.log('Tracing rays')

const renderer: AbstractRenderer = new ProjectileRenderer(450, 225, {
  initialVelocity: Tuple.Vector(1, 1.8, 0).normalize().multiply(7.25),
  gravity: 0.1,
  wind: Tuple.Vector(-0.02, 0, 0),
  tickPeriod: 1
})

const serializer: Serializer = new PpmSerializer()

renderer.exportToFile(serializer, 'output.ppm')
