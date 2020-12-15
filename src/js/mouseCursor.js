import { gsap, Power1 } from 'gsap'

// http://ahrengot.com/tutorials/greensock-javascript-animation

var circle = document.querySelector('.circle')
var follow = document.querySelector('.circle-follow')

function movCircle(e) {
  gsap.to(
    circle,
    0.1,
    {
      x: e.clientX,
      y: e.clientY,
    },
    Power1.easeInOut
  )
  gsap.to(follow, 0.8, {
    x: e.clientX,
    y: e.clientY,
  })
}

export function hoverFunc(e) {
  gsap.to(circle, 0.3, {
    opacity: 1,
    scale: 0,
    backgroundColor: '#ffffff',
  })
  gsap.to(follow, 0.3, {
    scale: 3,
    borderColor: '#ffffff',
  })
}

export function unhoverFunc(e) {
  gsap.to(circle, 0.3, {
    opacity: 1,
    scale: 1,
    backgroundColor: '#012FA7',
  })
  gsap.to(follow, 0.3, {
    scale: 1,
    borderColor: '#012FA7',

  })
}

window.addEventListener('mousemove', movCircle)

let buttons = document.querySelectorAll('.scene-button')
buttons.forEach((button) => {
  button.addEventListener('mouseover', hoverFunc)
  button.addEventListener('mouseout', unhoverFunc)
})
