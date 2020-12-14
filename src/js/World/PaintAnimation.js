import {
  Object3D,
  Color,
  VideoTexture,
  PlaneGeometry,
  RGBAFormat,
  RGBFormat,
  MeshBasicMaterial,
  Mesh,
  FrontSide,
  LinearFilter,
} from 'three'

export default class PaintAnimationSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Paint Animation'

    this.createPaintAnimation()
    if (this.debug) {
      this.setDebug()
    }
  }
  createPaintAnimation() {
    this.plane = new PlaneGeometry(40, 40)
    this.video = document.createElement('video')
    this.video.src = '../test.webm'
    this.video.load() // must call after setting/changing source
    // this.video.play();
    this.texture = new VideoTexture(this.video)
    this.texture.minFilter = LinearFilter
    this.texture.magFilter = LinearFilter
    this.texture.format = RGBAFormat
    this.videoMaterial = new MeshBasicMaterial({
      map: this.texture,
      // side: FrontSide,
      transparent: true,
    })
    this.videoObject = new Mesh(this.plane, this.videoMaterial)
    this.videoObject.position.z = 2.6
    this.container.add(this.videoObject)
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('Paint Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
  }
}
