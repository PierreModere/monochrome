import { Object3D, HemisphereLight, Color } from 'three'

export default class HemisphereLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Hemisphere Light'
    this.params = { color: 0xffffbb,color2:0x080820 }

    this.createHemisphereLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createHemisphereLight() {
    this.light = new HemisphereLight(this.params.color,this.params.color2,1 )
    this.container.add(this.light)
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('Hemisphere Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
  }
}
