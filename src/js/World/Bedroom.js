import { Object3D } from 'three'

export default class Bedroom {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Bedroom'

    this.createBedroom()
    this.setMovement()
  }
  createBedroom() {
    this.Bedroom = this.assets.models.bedroom.scene
    this.container.add(this.Bedroom)
    this.Bedroom.scale.x = 0.2;
    this.Bedroom.scale.y = 0.2;
    this.Bedroom.scale.z = 0.2;

  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Bedroom.rotation.y += 0.005
    })
  }
}
