import { AxesHelper, Object3D } from 'three'

import Samothrace from './Samothrace.js'
import Atelier from './Atelier.js'
import Lever from './Lever.js'
import AllLightSource from './AllLight.js'
import PaintAnimationSource from './PaintAnimation.js'
import Sounds from './Sounds'
import { movCircle, hoverFunc, unhoverFunc } from '../mouseCursor.js'
import lottie from 'lottie-web'

import { setAnthro } from './anthro.js'
import { setPeintureDeFeu,setParallax } from './firePaint.js'

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

    this.loaderAnimation = lottie.loadAnimation({
      container: document.getElementById('bm'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'loader.json',
    })

    this.setLoader()
  }
  init(sceneNumber) {
    let scene1 = document.querySelector('#_canvas')
    let scene2 = document.querySelector('#anth')
    let scene3 = document.querySelector('#lanceflamme')

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
        this.setSpotLight()
        break
      case 'scene2':
        scene2.style.display = 'block'
        scene2.style.opacity = '1'
        setAnthro()
        break
      case 'scene3':
        scene3.style.display = 'block'
        scene3.style.opacity = '1'
        setPeintureDeFeu()
        break
    }
  }

  setLoader() {
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')
    this.loaderAnimationContainer = this.loadDiv.querySelector('#bm')
    this.home = document.querySelector('.home')
    this.homeButton = this.home.querySelector('button')
    this.menu = document.querySelector('.menu')

    // if (this.assets.total === 0) {
    //   this.init()
    //   this.loadDiv.remove()
    // } else {
    //   this.assets.on('ressourceLoad', () => {
    //     // this.progress.style.width = this.loadModels.innerHTML = `${
    //     //   Math.floor((this.assets.done / this.assets.total) * 100) +
    //     //   Math.floor((1 / this.assets.total) * this.assets.currentPercent)
    //     // }%`
    //   })

    this.assets.on('ressourcesReady', () => {
      this.loadDiv.style.opacity = 0
      setTimeout(() => {
        this.loadDiv.remove()
      }, 550)
      this.home.style.display = 'flex'
      this.home.addEventListener('mousemove', movCircle)
      this.homeButton.addEventListener('mouseover', hoverFunc)
      this.homeButton.addEventListener('mouseout', unhoverFunc)
      this.homeButton.addEventListener('click', (e) => {
        this.home.style.opacity = 0
        setTimeout(() => {
          this.home.remove()
        }, 2000)
        this.menu.style.visibility = 'visible'
        this.menu.buttons = this.menu
          .querySelector('#svg-menu')
          .querySelectorAll('.scene-button')
        for (let button of this.menu.buttons) {
          button.addEventListener('click', (e) => {
            this.init(button.getAttribute('id'))
          })
        }
      })
    })
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

  setSpotLight() {
    this.light = new SpotLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
}
