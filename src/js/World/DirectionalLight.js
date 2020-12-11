import { Object3D, DirectionalLight, CameraHelper, Color } from 'three'

export default class DirectionalLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Directional Light'
    this.params = { color: 0xffffff, intensity: 1 }

    this.createDirectionalLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createDirectionalLight() {
    this.light = new DirectionalLight(this.params.color, this.params.intensity)
    this.light.position.set(0.0, 10, 5)
    // this.light.target.position.set(0, 0, 0)
    this.light.castShadow = true
    this.container.add(this.light)
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('Directional Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
  }
}
