import {
  Object3D,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
  HemisphereLight,
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
    // this.skyColor = 0xB1E1FF;  // light blue
    // this.groundColor = 0xB97A20;  // brownish orange
    // this.intensity = 1;
    // this.ambientLight = new HemisphereLight(sthis.kyColor, this.groundColor, this.intensity);
    // this.container.add(this.ambientLight);
    this.light = new SpotLight(0xffffff, 5)
    this.light.position.set(205, 210, -240)
    this.light.angle = 1.55
    this.light.power = 25
    this.light.decay = 0
    this.light.distance = 0
    this.light.penumbra = 1
    this.light.castShadow = true
    this.container.add(this.light)

    this.helper = new SpotLightHelper(this.light, 5)
    this.container.add(this.helper)
    this.container.children.forEach((light) => {
      light.castShadow = true
    })
    this.helper.castShadow = false
    // }
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
