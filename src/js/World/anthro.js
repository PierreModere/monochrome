import { setParallax } from './firePaint.js'
import { movCircle, hoverFunc, unhoverFunc } from '../mouseCursor.js'
import { launchVideo } from './endVideo'
import { gsap, Power3 } from 'gsap'
var anthros = document.querySelector('#anth').querySelectorAll('.anthro')
var taches = document.querySelector('#anth').querySelectorAll('.tache')
var bg = document.querySelector('#anth').querySelector('.background')
var button = document.querySelector('#anth').querySelector('.btn')

export function setAnthro() {
  var source = 'sounds/monotone0.mp3'

  var audioContext = new (window.AudioContext || window.webkitAudioContext)()
  var masterGain = audioContext.createGain()
  masterGain.connect(audioContext.destination)

  var song = new Audio(source)
  let songSource = audioContext.createMediaElementSource(song)

  songSource.connect(masterGain)
  masterGain.gain.value = 0.1
  song.play()

  setTimeout(() => {
    fadeIn(anthros[0])
  }, 800)

  for (let i = 0; i < anthros.length; i++) {
    anthros[i].addEventListener('click', function () {
      masterGain.gain.value *= 1.4

      if (i + 1 < anthros.length) fadeIn(anthros[i + 1])
      switch (i) {
        case 0:
          gsap.to('#bm3', {
            duration: 0.6,
            opacity: 0,
            ease: Power3.easeOut,
          })
          break
        case 2:
          fadeIn(taches[0])
          break
        case 4:
          fadeIn(taches[1])
          break
        case 6:
          fadeIn(taches[2])
          break
        case 7:
          fadeIn(bg)
          gsap.to(masterGain.gain, { delay: 2, duration: 8, value: 0 })
          setTimeout(() => {
            song.stop()
          }, 12000)
          setTimeout(() => {
            fadeIn(button)
            setParallax()
            document
              .querySelector('#anth')
              .addEventListener('mousemove', movCircle)
            button.querySelector('a').addEventListener('mouseover', hoverFunc)
            button.querySelector('a').addEventListener('mouseout', unhoverFunc)
            button.querySelector('a').addEventListener('click', () => {
              launchVideo('scene2')
              button.style.opacity = 0
              setTimeout(() => {
                button.remove()
              }, 2000)
            })
          }, 1200)
          break
      }
    })
  }
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

function audioSetup() {}
