import { Object3D, SpotLight, Color } from 'three'

export default class SpotLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Spotlight'
    this.params = { color: 0x232323 }

    this.createSpotLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createSpotLight() {
    this.light = new SpotLight(this.params.color, 5)
    this.light.castShadow = true
    this.light.shadowDarkness = 0.5
    this.container.add(this.light)
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('Spotlight')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
  }
}
