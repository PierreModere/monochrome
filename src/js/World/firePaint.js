import { gsap, TimelineMax } from 'gsap'
import { movCircle, hoverFunc, unhoverFunc } from '../mouseCursor.js'
import { launchVideo } from './endVideo'

export function setParallax() {
  document.addEventListener('mousemove', parallax)
  function parallax(e) {
    document.querySelectorAll('.object').forEach(function (move) {
      var moving_value = move.getAttribute('data-value')

      var x = (e.clientX * moving_value) / 250
      var y = (e.clientY * moving_value) / 250

      move.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)'
    })
  }
}
export function setPeintureDeFeu() {
  setParallax()
  const svg = document.querySelector('#demo')
  const tl = new TimelineMax({ onUpdate: onUpdate })
  let pt = svg.createSVGPoint()
  let data = document.querySelector('.tlProgress')
  const ratio = 0.5625

  tl.to('#masker', { duration: 2, attr: { r: 2400 }, ease: 'power2.in' })
  tl.reversed(true)

  function mouseHandler() {
    if (document.querySelector('#masker').getAttribute('r') < 2300) {
      tl.reversed(!tl.reversed())
      setTimeout(() => {      fadeIn(document.querySelector('#lanceflamme').querySelector('.btn'))
    },1500)
      document
        .querySelector('#lanceflamme')
        .addEventListener('mousemove', movCircle)
      let button = document.querySelector('#lanceflamme').querySelector('.btn')
      document
      button.querySelector('a').addEventListener('mouseover', hoverFunc)
      button.querySelector('a').addEventListener('mouseout', unhoverFunc)
      button.querySelector('a').addEventListener('click', () => {
        launchVideo('scene3')
        // button.style.opacity = 0
        // setTimeout(() => {
        //   button.remove()
        // }, 2000)
      })
    }
  }

  function getPoint(evt) {
    pt.x = evt.clientX
    pt.y = evt.clientY
    return pt.matrixTransform(svg.getScreenCTM().inverse())
  }

  function mouseMovement(evt) {
    let newPoint = getPoint(evt)
    gsap.to('#ring, #masker', 0.88, {
      attr: { cx: newPoint.x, cy: newPoint.y },
      ease: 'power2.out',
    })
  }

  function onUpdate() {
    let prog = tl.progress() * 100
  }

  function newSize() {
    let w = window.innerWidth
    let h = window.innerHeight
    if (w > h * (5 / 3)) {
      gsap.set('#demo', { attr: { width: w, height: w * ratio } })
    } else {
      gsap.set('#demo', { attr: { width: h / ratio, height: h } })
    }
    let data = svg.getBoundingClientRect()
    gsap.set('#demo', { x: w / 2 - data.width / 2 })
    gsap.set('#demo', { y: h / 2 - data.height / 2 })
  }

  window.addEventListener('mousedown', mouseHandler)
  window.addEventListener('mouseup', mouseHandler)
  window.addEventListener('mousemove', mouseMovement)

  newSize()
  window.addEventListener('resize', newSize)
}
function fadeIn(element) {
  var op = 0 // initial opacity
  if (element == document.querySelector('#lanceflamme').querySelector('.btn')) {
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
