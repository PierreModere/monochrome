import { Raycaster, Vector2, Object3D } from 'three'

export default class Atelier {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Atelier'

    this.createAtelier()
    this.setMovement()
  }
  createAtelier() {
    this.Atelier = this.assets.models.BakedAtelier.scene
    this.container.add(this.Atelier)
    this.Atelier.scale.x = 0.5
    this.Atelier.scale.y = 0.5
    this.Atelier.scale.z = 0.5
    this.Atelier.position.set(0,0,0)
    this.Atelier.children.forEach((child) => {
      child.castShadow = true
    })
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Atelier.rotation.y += 0.005
    })
  }
}
