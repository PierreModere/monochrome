import { Raycaster, Vector2, Object3D } from 'three'

export default class Workshop {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Workshop'

    this.createWorkshop()
    this.setMovement()
  }
  createWorkshop() {
    this.Workshop = this.assets.models.workshop.scene
    this.container.add(this.Workshop)
    this.Workshop.scale.x = 1
    this.Workshop.scale.y = 1
    this.Workshop.scale.z = 1
    this.Workshop.position.set(-20, -20, 85)
    this.Workshop.rotation.y = 0.84
    this.Workshop.children.forEach((child) => {
      child.castShadow = true
    })
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Workshop.rotation.y += 0.005
    })
  }
}
