import { AxesHelper, Object3D } from 'three'

import Samothrace from './Samothrace.js'
import Workshop from './Workshop.js'
import Room from './Room.js'
import Atelier from './Atelier.js'
import Lever from './Lever.js'
import AllLightSource from './AllLight.js'
import PaintAnimationSource from './PaintAnimation.js'
import Sounds from './Sounds'
import { hoverFunc, unhoverFunc } from '../mouseCursor.js'

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
  init(sceneNumber) {
    setTimeout(() => {
      document.querySelector('.menu').style.opacity = '0'
      setTimeout(() => {
        document.querySelector('.menu').remove()
      }, 550)
    }, 730)
    switch (sceneNumber) {
      case 'scene1':
        // this.setSamothrace()
        this.setAtelier()
        // this.setRoom()
        this.setLever()
        this.setAllLight()
        this.setPaintAnimation()
        this.setSounds()
        break
      case 'scene2':
        this.setSamothrace()
        this.setRoom()
        this.setLever()
        this.setAllLight()
        this.setPaintAnimation()
        this.setSounds()
        break
      case 'scene3':
        this.setWorkshop()
        this.setSounds()
        break
    }
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
        this.button.addEventListener('mouseover', hoverFunc)
        this.button.addEventListener('mouseout', unhoverFunc)
        this.button.addEventListener('click', () => {
          let menu = document.querySelector('.menu')
          setTimeout(() => {
            this.loadDiv.style.opacity = 0
            setTimeout(() => {
              this.loadDiv.remove()
            }, 550)
          }, 400)
          menu.style.visibility = 'visible'
          menu.buttons = menu.querySelectorAll('.scene-button')
          for (let button of menu.buttons) {
            button.addEventListener('click', (e) => {
              this.init(button.getAttribute('id'))
            })
          }
        })
      })
    }
  }
  setSounds() {
    this.sounds = new Sounds({
      assets: this.assets,
      camera: this.camera,
      src: this.assets.sounds.test,
    })
  }
  setAllLight() {
    this.light = new AllLightSource({
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
  setAtelier() {
    this.Atelier = new Atelier({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.Atelier.container)
  }
  setPaintAnimation() {
    this.Video = new PaintAnimationSource({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.Video.container)
  }
}
