import { setParallax } from './firePaint.js'
import { movCircle, hoverFunc, unhoverFunc } from '../mouseCursor.js'
import { gsap } from 'gsap'

var divVideo = document.querySelector('.divVideo')
var videoContainer = divVideo.querySelector('.endVideo')
var button = videoContainer.querySelector('.btnMenu')

var taches = document.querySelector('#anth').querySelectorAll('.tache')
var bg = document.querySelector('#anth').querySelector('.background')

export function launchVideo(sceneNumber) {
  let videoSrc
  switch (sceneNumber) {
    case 'scene1':
      videoSrc = './videos/statue.mp4'
      break
    case 'scene2':
      videoSrc = './videos/anthro.mp4'
      break
    case 'scene3':
      videoSrc = './videos/feu.mp4'
      break
  }
  videoContainer.src = videoSrc
  divVideo.style.display = 'flex'
  divVideo.style.opacity = '1'
  document.querySelector('.backMenu').style.display = 'block'
  document.querySelector('.backMenu').style.opacity = 1
  document.querySelector('.backMenu').addEventListener('mousemove', movCircle)
  document.querySelector('.backMenu').addEventListener('mouseover', hoverFunc)
  document.querySelector('.backMenu').addEventListener('mouseout', unhoverFunc)
  document.querySelector('.backMenu').addEventListener('click', () => {
    location.reload()
  })
  divVideo.addEventListener('mousemove', movCircle)
}

export function fadeIn(element, mode) {
  var op = 0 // initial opacity
  if (element == button || mode == 'flex') {
    element.style.display = 'flex'
  } else {
    element.style.display = 'block'
  }
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer)
    }
    element.style.opacity = 1
  }, 10)
}
