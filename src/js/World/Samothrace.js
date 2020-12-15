import { Raycaster, Vector2, Object3D } from 'three'

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
    this.Samothrace.scale.x = 1
    this.Samothrace.scale.y = 1
    this.Samothrace.scale.z = 1
    this.Samothrace.children.forEach((child) => {
      child.castShadow = true
    })
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Samothrace.rotation.y += 0.005
    })
  }
}
