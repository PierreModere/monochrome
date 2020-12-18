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
  DoubleSide,
} from 'three'

import { gsap } from 'gsap'

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
    this.plane = new PlaneGeometry(192, 108)
    this.video = document.createElement('video')
    this.video.src = '../paintAnimation.webm'
    this.video.load() // must call after setting/changing source
    this.texture = new VideoTexture(this.video)
    this.texture.minFilter = LinearFilter
    this.texture.magFilter = LinearFilter
    this.texture.format = RGBAFormat
    this.videoMaterial = new MeshBasicMaterial({
      map: this.texture,
      side: DoubleSide,
      transparent: true,
    })
    this.material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide })
    this.videoObject = new Mesh(this.plane, this.videoMaterial)
    this.videoObject.position.set(230.0, 98.0, -183.0)
    this.videoObject.scale.set(0.5, 0.5, 0.5)
    this.videoObject.rotation.y = -Math.PI / 2
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
