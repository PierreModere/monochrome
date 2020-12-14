import { Object3D, PointLight, HemisphereLight, Color } from 'three'

export default class PointLightSource {
  constructor(options) {
    // Set options
    // this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Point Light'
    this.params = {
      color: 0xc4c4c4,
      positionX: 0,
      positionY: 10,
      positionZ: 5,
    }

    this.createPointLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createPointLight() {
    this.light = new PointLight(this.params.color)
    this.light.castShadow = true
    // this.light.intensity
    // console.log(this.light.shadow)

    this.light.shadow.mapSize.width = 1024
    this.light.shadow.mapSize.height = 1024

    this.light.position.set(
      this.params.positionX,
      this.params.positionY,
      this.params.positionZ
    )
    this.container.add(this.light)
  }
  setDebug() {
    // Color debug
    this.debugFolder = this.debug.addFolder('Point Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
    //Position debug
    this.debugFolder
      .add(this.light.position, 'x')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position X')
    this.debugFolder
      .add(this.light.position, 'y')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position Y')
    this.debugFolder
      .add(this.light.position, 'z')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position Z')
  }
}
