import { AxesHelper, Object3D, Color } from 'three'

import Samothrace from './Samothrace.js'
import Atelier from './Atelier.js'
import Lever from './Lever.js'
import AllLightSource from './AllLight.js'
import PaintAnimationSource from './PaintAnimation.js'
import Sounds from './Sounds'

import {
  movCircle,
  removeCircle,
  hoverFunc,
  unhoverFunc,
} from '../mouseCursor.js'
import lottie from 'lottie-web'

import { setAnthro } from './anthro.js'
import { setPeintureDeFeu, setParallax } from './firePaint.js'
import { gsap, Power3 } from 'gsap'

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

    this.loaderAnimationDrag = lottie.loadAnimation({
      container: document.getElementById('bm3'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'drag.json',
    })

    this.loaderAnimationDrag2 = lottie.loadAnimation({
      container: document.getElementById('bm2'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'drag2.json',
    })

    this.setLoader()
  }
  showExplanations(sceneNumber) {
    let infoDiv = document.querySelector('.informationDiv')
    let shapeImg = infoDiv.querySelector('.shape')
    let titleElement = infoDiv.querySelector('.title')
    let textElement = infoDiv.querySelector('.explanation')
    let bgUrl
    let shape
    let title
    let explanationText

    infoDiv.addEventListener('mousemove', movCircle)

    document.querySelector('.menu').style.opacity = '0'
    setTimeout(() => {
      document.querySelector('.menu').remove()
    }, 1000)
    switch (sceneNumber) {
      case 'scene1':
        bgUrl = './explications/statue.png'
        shape = './explications/statueShape.png'
        title = 'La victoire de Samothrace'
        explanationText =
          '"La beauté du bleu dans l’éponge" Chaque sculpture est unique, élégante et dotée d’une finesse inégalée'
        break
      case 'scene2':
        bgUrl = './explications/anthro.png'
        shape = './explications/anthroShape.png'
        title = 'Anthropométries'
        explanationText =
          'C’est en même temps quelque chose qui renoue avec des mœurs très anciennes, bien avant la civilisation, dans les cavernes, il y avait des traces, il y avait des empreintes, il y a eu des empreintes de mains'
        break
      case 'scene3':
        bgUrl = './explications/feu.png'
        shape = './explications/feuShape.png'
        title = 'Peinture de feu'
        explanationText =
          '"Le feu est pour moi l’avenir sans oublier le passé. Il est la mémoire de la nature. Il est douceur, le feu est douceur et torture. Il est cuisine et apocalypse"'
        break
    }
    infoDiv.style.backgroundImage = `url("${bgUrl}")`
    shapeImg.src = shape
    titleElement.textContent = title
    textElement.textContent = explanationText
    infoDiv.style.display = 'flex'
    infoDiv.addEventListener('click', (e) => {
      this.init(sceneNumber)
      setTimeout(() => {
        infoDiv.remove()
      }, 2000)
    })
  }
  init(sceneNumber) {
    let scene1 = document.querySelector('#_canvas')
    let scene2 = document.querySelector('#anth')
    let scene3 = document.querySelector('#lanceflamme')
    document.querySelector('.informationDiv').style.opacity = 0
    setTimeout(() => {
      document.querySelector('.informationDiv').style.display = 'none'
    }, 730)
    switch (sceneNumber) {
      case 'scene1':
        removeCircle()
        window.isScene1 = true
        this.setAtelier()
        this.setPaintAnimation()
        this.setSounds()
        this.setAllLight()
        this.setCameraAnimation()
        break
      case 'scene2':
        scene2.style.display = 'block'
        scene2.style.opacity = '1'
        setAnthro()
        gsap.to('#bm3', {
          duration: 0.5,
          delay: 1,
          opacity: 1,
          ease: Power3.easeOut,
        })
        removeCircle()
        break
      case 'scene3':
        scene3.style.display = 'block'
        scene3.style.opacity = '1'
        setPeintureDeFeu()
        removeCircle()
        break
    }
  }
  getUrlVars() {
    let vars = {}
    let parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value
      }
    )
    return vars
  }

  setLoader() {
    // if (this.getUrlVars==undefined)
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')
    this.loaderAnimationContainer = this.loadDiv.querySelector('#bm')
    this.home = document.querySelector('.home')
    this.homeButton = this.home.querySelector('button')
    this.menu = document.querySelector('.menu')

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
        }, 1500)
        this.menu.style.display = 'flex'
        this.menu.buttons = this.menu
          .querySelector('#svg-menu')
          .querySelectorAll('.scene-button')
        for (let button of this.menu.buttons) {
          button.addEventListener('mouseover', (e) => {
            this.changeMenuAnim(button.getAttribute('id'))
          })
          button.addEventListener('mouseout', this.resetMenuAnim)

          button.addEventListener('click', (e) => {
            this.showExplanations(button.getAttribute('id'))
          })
        }
      })
    })
  }

  setSounds() {
    this.sounds = new Sounds({
      assets: this.assets,
      camera: this.camera,
      src: this.assets.sounds.Samothrace,
    })
  }

  setCameraAnimation() {
    gsap.to(this.camera.position, {
      duration: 6,
      delay: 0.5,
      ease: Power3.easeOut,
      x: 165,
      y: 95,
      z: -180,
    })
    gsap.to(this.camera.rotation, {
      duration: 5,
      delay: 0.5,
      y: -Math.PI / 2,
      ease: Power3.easeOut,
    })

    gsap.to('#bm2', {
      duration: 1,
      delay: 6,
      opacity: 1,
      ease: Power3.easeOut,
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

  changeMenuAnim(sceneNumber) {
    let imgDOM = document.querySelector('.img2')
    imgDOM.style.display = 'block'

    switch (sceneNumber) {
      case 'scene1':
        imgDOM.src = 'menuAnim/SamothraceAnim.gif'
        break
      case 'scene2':
        imgDOM.src = 'menuAnim/AnthroAnim.gif'
        break
      case 'scene3':
        imgDOM.src = 'menuAnim/FeuAnim.gif'
        break

      default:
        break
    }
  }
  resetMenuAnim() {
    let imgDOM = document.querySelector('.img2')
    imgDOM.style.display = 'none'
  }
}
