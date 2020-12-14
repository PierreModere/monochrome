import {
  Object3D,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  PointLight,
  PointLightHelper,
  Color,
} from 'three'

export default class AllLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'All Light'

    this.createAmbientLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createAmbientLight() {
    // this.light = new AmbientLight(0x404040, 0.2)
    // this.container.add(this.light)
    this.light2 = new DirectionalLight(0xbba8f5, 1)
    this.light2.position.set(0, 1, 4)
    this.light2.castShadow = true
    // this.container.add(this.light2)
    this.helper = new DirectionalLightHelper(this.light2, 5)
    // this.container.add(this.helper)
    this.light3 = new PointLight(0xc4c4c4, 1)
    this.light3.position.set(0, 300, 500)
    // this.container.add(this.light3)
    this.light4 = new PointLight(0xc4c4c4, 1)
    this.light4.position.set(500, 100, 0)
    // this.container.add(this.light4)
    this.light5 = new PointLight(0xbba8f5, 1)
    this.light5.position.set(-1, 15, 10)
    this.container.add(this.light5)
    this.light6 = new PointLight(0xbba8f5, 1)
    this.light6.position.set(-0.200, 3, 1)
    this.light6.castShadow = true
    this.helper2 = new PointLightHelper(this.light6, 5)
    // this.container.add(this.helper2)
    this.helper2.castShadow=false
    // this.container.add(this.light6)
    this.container.children.forEach((light) => {
      light.castShadow = true
    })
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('All Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
  }
}
