import { gsap, TimelineMax } from 'gsap'

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
    if (document.querySelector('#masker').getAttribute('r') < 2300)
      tl.reversed(!tl.reversed())
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
