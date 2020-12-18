import {
  Raycaster,
  Vector2,
  Scene,
  WebGLRenderer,
  PCFSoftShadowMap,
  sRGBEncoding,
} from 'three'
import { gsap, Power3 } from 'gsap'

import Sizes from '@tools/Sizes.js'
import Time from '@tools/Time.js'
import Assets from '@tools/Loader.js'

import Camera from './Camera.js'
import World from '@world/index.js'
import Infos from './Infos'
import { launchVideo } from '@world/endVideo.js'
import { fadeIn } from '@world/anthro.js'

var allowMove = true
var cameraMoves = {
  x: 0,
  y: 0,
  z: 0,
  move: false,
  speed: 0.2,
}
// var raycaster = new Raycaster()
// var mouseRaycaster = new Vector2()
export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Assets()
    this.samothrace = null
    this.video = null
    this.materialVideo = null

    this.mouseRaycaster = {}
    this.raycaster = new Raycaster()
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    this.allowMove = true

    // this.rotSpeed = 0.02

    this.selected = null

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
    this.setMouseRotation()
    this.mouseClick()
    this.moseMovRaycastr()
  }
  setRenderer() {
    // Set scene
    this.scene = new Scene()

    // Set renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
    // Set background color
    this.renderer.setClearColor(0xf0f0f0, 1)

    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMapSoft = true
    this.renderer.shadowMap.type = PCFSoftShadowMap
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.physicallyCorrectLights = true

    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })

    // Set RequestAnimationFrame with 60ips
    this.time.on('tick', () => {
      if (window.isScene1) {
        this.renderer.render(this.scene, this.camera.camera)
        // this.cameraRotation()
        this.raycaster.setFromCamera(this.mouseRaycaster, this.camera.camera)
        // calculate objects intersecting the picking ray var intersects =
        this.intersects = this.raycaster.intersectObjects(
          this.scene.children[1].children[0].children[0].children[0].children
        )
        if (this.intersects.length > 0) {
          this.intersects[0].object.parent.traverse((child) => {
            if (child != this.selected) {
              this.selected = child
            }
          })
        } else {
          this.selected = null
        }
      }
    })
  }

  mouseClick() {
    document.addEventListener('click', () => {
      if (this.selected == null) {
        return
      }
      this.allowMove=false
      this.scene.children[1].children[1].children[0].material.map.image.play()
      gsap.to('#bm2', {
        duration: 0.5,
        delay: 0.5,
        opacity: 0,
        ease: Power3.easeOut,
      })

      setTimeout(() => {
        this.scene.children[1].children[0].children[0].children[0].children[1].material.color.set(
          0x0006c2
        )
        let button = document.querySelector('.btnCanvas')
        setTimeout(() => {
          fadeIn(button, 'flex')
          button.addEventListener('click', function () {
            launchVideo('scene1')
          })
        }, 2500)
      }, 1200)
      gsap.to(this.scene.children[1].children[1].children[0].material, {
        duration: 1,
        delay: 4,
        opacity: 0,
      })
      this.selected == null
    })
  }

  moseMovRaycastr() {
    window.addEventListener('mousemove', (event) => {
      this.mouseRaycaster.x =
        (event.clientX / this.sizes.viewport.width) * 2 - 1

      this.mouseRaycaster.y =
        -(event.clientY / this.sizes.viewport.height) * 2 + 1
    })
  }
  setMouseRotation() {
    window.addEventListener('mousemove', (e) => {
      if (this.allowMove) {
        // Rotation verticale
        this.world.container.rotation.y += Math.max(
          Math.min((e.clientX - this.mouse.x) * 0.000005, cameraMoves.speed),
          -cameraMoves.speed
        )
        //Rotation horizontale
        // this.world.container.rotation.x += Math.max(
        //   Math.min((this.mouse.y - e.clientY) * 0.00001, cameraMoves.speed),
        //   -cameraMoves.speed
        // )
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY
      }
    })
  }

  // setInfos() {
  //   if (!this.infos) {
  //     this.infos = new Infos({
  //       samothrace: this.scene.children[1].children[0].children[0].children[0],
  //       sizes: this.sizes,
  //       camera: this.camera.camera,
  //       video: this.scene.children[1].children[2].children[0],
  //     })
  //   }
  // }

  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      time: this.time,
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
    this.camera.camera.rotation.x = 0
  }

  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      assets: this.assets,
      camera: this.camera.camera,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 420 })
    }
  }
}
