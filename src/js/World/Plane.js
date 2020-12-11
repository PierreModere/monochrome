import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, Object3D } from 'three'

export default class Plane {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Plane'

    this.createPlane()
    this.setMovement()
  }
  createPlane() {
    this.buffer = new PlaneBufferGeometry(2000, 2000, 8, 8)
    this.mat = new MeshBasicMaterial({
      color: 0xffffff    })
    this.plane = new Mesh(this.buffer, this.mat)
    this.container.add(this.plane)
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Plane.rotation.y += 0.005
    })
  }
}
