import { AxesHelper, Object3D } from 'three'

import AmbientLightSource from './AmbientLight.js'
import HemisphereLightSource from './HemisphereLight.js'
import PointLightSource from './PointLight.js'
import PointLightSource2 from './PointLight2.js'
import DirectionalLightSource from './DirectionalLight.js'
import SpotLightSource from './SpotLight.js'
import Samothrace from './Samothrace.js'
import Room from './Room.js'
import Plane from './Plane.js'
import Lever from './Lever.js'
import AllLightSource from './AllLight.js'
export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets

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
    // this.setPlane()
    this.setLever()
    // this.setAmbientLight()
    // this.setHemisphereLight()
    // this.setPointLight()
    // this.setSpotLight()
    // this.setDirectionalLight()
    this.setAllLight()
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
        setTimeout(() => {
          this.init()
          this.loadDiv.style.opacity = 0
          setTimeout(() => {
            this.loadDiv.remove()
          }, 550)
        }, 1000)
      })
    }
  }
  setAllLight() {
    this.light = new AllLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setHemisphereLight() {
    this.light = new HemisphereLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setAmbientLight() {
    this.light = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)

    this.light2 = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light2.container)
  }
  setSpotLight() {
    this.light = new SpotLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setDirectionalLight() {
    this.light = new DirectionalLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
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
  setPlane() {
    this.Plane = new Plane({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.Plane.container)
  }
}
