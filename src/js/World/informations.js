export function information() {
  this.informationDiv = document.createElement('div')
  this.informationDiv.classList.add('informationDiv')
}

// this.button = document.createElement('button')
// this.button.innerHTML = 'Start VitraHaus'
// this.loadDiv.append(this.button)

// let that = this
// const start = function() {
//   that.button.removeEventListener('click', start)
//   setTimeout(() => {
//     that.loadDiv.style.opacity = 0
//     setTimeout(() => {
//       that.loadDiv.remove()
//       that.init()
//     }, 550)
//   }, 1000)
// }
// this.informationDiv   = document.createElement("div")
// this.informationDiv.classList.add("informationDiv")
//   this.button = document.createElement('button')
//       this.button.innerHTML = 'Start VitraHaus'
//       this.loadDiv.append(this.button)

//       let that = this
//       const start = function() {
//         that.button.removeEventListener('click', start)
//         setTimeout(() => {
//           that.loadDiv.style.opacity = 0
//           setTimeout(() => {
//             that.loadDiv.remove()
//             that.init()
//           }, 550)
//         }, 1000)
//       }
// this.loadDiv = document.querySelector('.loadScreen')
// this.loadModels = this.loadDiv.querySelector('.load')
// this.progress = this.loadDiv.querySelector('.progress')

// if (this.assets.total === 0) {
//   this.init()
//   this.loadDiv.remove()
// } else {
//   this.assets.on('ressourceLoad', () => {
//     this.progress.style.width = this.loadModels.innerHTML = `${
//       Math.floor((this.assets.done / this.assets.total) * 100) +
//       Math.floor((1 / this.assets.total) * this.assets.currentPercent)
//     }%`
//   })

//   this.assets.on('ressourcesReady', () => {
//     setTimeout(() => {
//       this.init()
//       this.loadDiv.style.opacity = 0
//       setTimeout(() => {
//         this.loadDiv.remove()
//       }, 550)
//     }, 1000)
//   })
// }
// }
