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

import * as dat from 'dat.gui'
import './mouseCursor.js'

var allowMove = true
var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
var cameraMoves = {
  x: 0,
  y: 0,
  z: 0,
  move: false,
  speed: 0.2,
}
var raycaster = new Raycaster()
var mouseRaycaster = new Vector2()
export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Assets()

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
    this.setMouseRotation()
  }
  setRenderer() {
    // Set scene
    this.scene = new Scene()

    this.atelier = new Scene()

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
      this.renderer.render(this.scene, this.camera.camera)
      if (this.scene.children[1].children[0] != undefined) {
        if (this.statue == null || this.statue == undefined) {
          this.statue = this.scene.children[1].children[0].children[0].children[0].children[2]
        }
        // this.camera.camera.lookAt(this.statue.position)

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouseRaycaster, this.camera.camera)
        // calculate objects intersecting the picking ray var intersects =
        const intersects = raycaster.intersectObjects(
          this.scene.children[1].children[2].children[0].children
        )

        if (intersects.length > 0) {
          let video = this.scene.children[1].children[4].children[0].material
            .map.image
          let camera = this.camera.camera
          let world = this.scene.children[1]
          let samothraceColor = this.scene.children[1].children[0].children[0]
            .children[0].material.color

          window.addEventListener('click', (e) => {
            this.leverAnimation(samothraceColor, world, intersects, video)
          })
        }
      }
    })
  }

  leverAnimation(target, world, group, video) {
    if (group[0].object.name == 'Levier001') {
      target.set(0xf0f0f0)
      gsap.to(group[0].object.rotation, {
        duration: 2,
        x: 20,
      })
      gsap.to(world.rotation, { y: 0, duration: 1, ease: Power3.easeOut })
      allowMove = false
      video.play()
    }
  }

  setMouseRotation() {
    window.addEventListener('mousemove', (e) => {
      if (allowMove) {
        //Rotation verticale
        this.world.container.rotation.y += Math.max(
          Math.min((e.clientX - mouse.x) * 0.00007, cameraMoves.speed),
          -cameraMoves.speed
        )
        //Rotation horizontale

        this.world.container.rotation.x += Math.max(
          Math.min((mouse.y - e.clientY) * 0.00008, cameraMoves.speed),
          -cameraMoves.speed
        )
        mouse.x = e.clientX
        mouse.y = e.clientY
      }
    })

    window.addEventListener('mousemove', function (e) {
      mouseRaycaster.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRaycaster.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
  }

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
