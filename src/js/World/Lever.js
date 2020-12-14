import { Object3D, AnimationMixer } from 'three'

export default class Lever {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Lever'

    this.createLever()
    this.setMovement()
  }
  createLever() {
    this.Lever = this.assets.models.Lever.scene
    this.container.add(this.Lever)
    this.Lever.scale.x = 1.5
    this.Lever.scale.y = 1.5
    this.Lever.scale.z = 1.5
    this.Lever.position.set(-2, 0, -28)

    this.Lever.children.forEach((child) => {
      child.castShadow = true
    })
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Lever.rotation.y += 0.005
    })
  }
}
