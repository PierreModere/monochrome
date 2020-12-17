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
    this.light = new PointLight(0xffffff, 1)
    this.light.position.set(545, 130, 365)
    this.light.power = 20
    this.light.castShadow = true
    this.container.add(this.light)

    this.helper = new PointLightHelper(this.light, 5)
    this.container.add(this.helper)
    this.container.children.forEach((light) => {
      light.castShadow = true
    })
    this.helper.castShadow = false
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
