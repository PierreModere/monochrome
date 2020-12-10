import { Object3D } from 'three'

export default class Samothrace {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Samothrace'

    this.createSamothrace()
    this.setMovement()
  }
  createSamothrace() {
    this.Samothrace = this.assets.models.SmallSamothrace2.scene
    this.container.add(this.Samothrace)
    this.Samothrace.scale.x = 0.2
    this.Samothrace.scale.y = 0.2
    this.Samothrace.scale.z = 0.2
    this.Samothrace.position.y = 0.1
    this.Samothrace.roughnessFactor
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Samothrace.rotation.y += 0.005
    })
  }
}
