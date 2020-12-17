import { setParallax } from './firePaint.js'
import { movCircle, hoverFunc, unhoverFunc } from '../mouseCursor.js'
var anthros = document.querySelector('#anth').querySelectorAll('.anthro')
var taches = document.querySelector('#anth').querySelectorAll('.tache')
var bg = document.querySelector('#anth').querySelector('.background')
var button = document.querySelector('#anth').querySelector('.btn')

export function setAnthro() {
  var source = 'sounds/monotone.mp3'

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
      masterGain.gain.value *= 1.5

      if (i + 1 < anthros.length) fadeIn(anthros[i + 1])
      switch (i) {
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
          setTimeout(() => {
            fadeIn(button)
            setParallax()
            document
              .querySelector('#anth')
              .addEventListener('mousemove', movCircle)
            button.querySelector('a').addEventListener('mouseover', hoverFunc)
            button.querySelector('a').addEventListener('mouseout', unhoverFunc)
          }, 1200)
          break
      }
    })
  }
}

function fadeIn(element) {
  var op = 0 // initial opacity
  if (element == button) {
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
