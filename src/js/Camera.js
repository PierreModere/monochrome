import {
  Object3D,
  PerspectiveCamera,
  CatmullRomCurve3,
  Vector3,
  Euler,
} from 'three'
import { gsap, Linear } from 'gsap'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

import Samothrace from './World/Samothrace.js'

export default class Camera {
  constructor(options) {
    // Set Options
    this.time = options.time
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
    this.setPosition()
    // this.setOrbitControls()
    this.setMovement()
    // this.setEvent()
    document.querySelector("#_canvas").addEventListener('click', this.setAnimation)
  }
  setCamera() {
    // Create camera
    this.camera = new PerspectiveCamera(
      45,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.1,
      2000
    )
    this.container.add(this.camera)
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      // Call this method because of the above change
      this.camera.updateProjectionMatrix()
    })
  }

  setPosition() {
    // this.camera.position.set(165, 96.300, -180)
    // this.camera.rotation.y = -Math.PI/2

    this.camera.position.set(0, 200, -500)
    this.camera.rotation.y = -Math.PI
    // this.camera.rotation.y = -Math.PI
  }

  // setAnimation() {
  //     gsap.to(this.camera.position, {
  //       duration: 8,
  //       delay: 2,
  //       x: 165,
  //       y: 95,
  //       z: -180,
  //     })
  //     gsap.to(this.camera.rotation, {
  //       duration: 8,
  //       delay: 2,

  //       y: -Math.PI / 2,
  //     })
  //   }
  // }

  setOrbitControls() {
    // Set orbit control
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    )

    this.orbitControls.enabled = true
    // this.orbitControls.enableKeys = false
    // this.orbitControls.zoomSpeed = 1
    // this.orbitControls.enableZoom = false;
    // this.orbitControls.enablePan = false

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('Camera')
      this.debugFolder.open()
      this.debugFolder
        .add(this.orbitControls, 'enabled')
        .name('Enable Orbit Control')
        .add(this.controls, 'enabled')
        .name('Enable Orbit Control')
    }
  }

  setMovement() {
    this.time.on('tick', () => {})
  }
}
