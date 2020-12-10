import { Object3D } from 'three'

export default class Room {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Room'

    this.createRoom()
    this.setMovement()
  }
  createRoom() {
    this.Room = this.assets.models.Room2.scene
    this.container.add(this.Room)
    this.Room.scale.x = 0.2
    this.Room.scale.y = 0.2
    this.Room.scale.z = 0.2
  }
  setMovement() {
    this.time.on('tick', () => {
      // this.Room.rotation.y += 0.005
    })
  }
}
