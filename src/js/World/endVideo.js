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
}
