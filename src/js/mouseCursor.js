import { gsap, Power1 } from 'gsap'

var circle = document.querySelector('.circle')
var follow = document.querySelector('.circle-follow')

export function movCircle(e) {
  circle.style.opacity = 1
  follow.style.opacity = 1
  circle.style.display = 'block'
  follow.style.display = 'block'
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

export function removeCircle() {
  circle.style.opacity = 0
  follow.style.opacity = 0
  setTimeout(() => {
    circle.style.display = 'none'
    follow.style.display = 'none'
  }, 600)
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

document.querySelector('.menu').addEventListener('mousemove', movCircle)

let buttons = document.querySelectorAll('.scene-button')
buttons.forEach((button) => {
  button.addEventListener('mouseover', hoverFunc)
  button.addEventListener('mouseout', unhoverFunc)
})

export function removeCircles() {
  circle.style.opacity = 0
  follow.style.opacity = 0
  setTimeout(() => {
    circle.style.display = 'none'
    follow.style.display = 'none'
  }, 500)
}
