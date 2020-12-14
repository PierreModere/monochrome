import { AxesHelper, Object3D } from 'three'

import Samothrace from './Samothrace.js'
import Room from './Room.js'
import Plane from './Plane.js'
import Lever from './Lever.js'
import AllLightSource from './AllLight.js'
import PaintAnimationSource from './PaintAnimation.js'
import Sounds from './Sounds'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets
    this.camera = options.camera


    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.setLoader()
  }
  init() {
    this.setSamothrace()
    this.setRoom()
    this.setLever()
    this.setAllLight()
    this.setPaintAnimation()
  }

  start() {
    this.setSounds()
  }
  setLoader() {
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')

    if (this.assets.total === 0) {
      this.init()
      this.loadDiv.remove()
    } else {
      this.assets.on('ressourceLoad', () => {
        this.progress.style.width = this.loadModels.innerHTML = `${
          Math.floor((this.assets.done / this.assets.total) * 100) +
          Math.floor((1 / this.assets.total) * this.assets.currentPercent)
        }%`
      })

      this.assets.on('ressourcesReady', () => {
        this.button = document.createElement('button')
        this.button.innerHTML = "Commencer l'expérience"
        this.button.classList.add('start-button')
        this.loadModels.style.display = 'none'
        this.progress.style.display = 'none'
        this.loadDiv.append(this.button)
        this.button.addEventListener('click', () => {
          setTimeout(() => {
            this.loadDiv.style.opacity = 0
            setTimeout(() => {
              this.loadDiv.remove()
            }, 550)
          }, 1000)
          this.start()
        })
        this.init()
      })
    }
  }
  setSounds() {
    this.sounds = new Sounds({
      assets: this.assets,
      camera: this.camera,
    })
  }
  setAllLight() {
    this.light = new AllLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  // setHemisphereLight() {
  //   this.light = new HemisphereLightSource({
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.light.container)
  // }
  // setAmbientLight() {
  //   this.light = new AmbientLightSource({
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.light.container)
  // }
  // setPointLight() {
  //   this.light = new PointLightSource({
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.light.container)

  //   this.light2 = new PointLightSource({
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.light2.container)
  // }
  // setSpotLight() {
  //   this.light = new SpotLightSource({
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.light.container)
  // }
  // setDirectionalLight() {
  //   this.light = new DirectionalLightSource({
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.light.container)
  // }
  setSamothrace() {
    this.Samothrace = new Samothrace({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.Samothrace.container)
  }
  setRoom() {
    this.Room = new Room({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.Room.container)
  }
  setLever() {
    this.Lever = new Lever({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.Lever.container)
  }
  setPaintAnimation() {
    this.Video = new PaintAnimationSource({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.Video.container)
  }
}
