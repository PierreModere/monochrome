import { Audio, AudioListener } from 'three'

export default class Sounds {
  constructor(options) {
    // Set options
    this.assets = options.assets
    this.camera = options.camera
    this.src = options.src

    // Set up
    this.listener = new AudioListener()
    this.camera.add(this.listener)
    this.setBackgroundAudio()
  }
  setBackgroundAudio() {
    this.backgroundSound = new Audio(this.listener)
    this.backgroundSound.setBuffer(this.src)

    this.backgroundSound.setLoop(true)
    this.backgroundSound.setLoopEnd(this.src.duration)

    this.backgroundSound.setVolume(0.2)
    this.backgroundSound.play()

    this.setLoop()
  }
  setLoop() {
    this.backgroundSound.gain.gain.setValueAtTime(
      0,
      this.backgroundSound.gain.context.currentTime
    )
    this.backgroundSound.gain.gain.linearRampToValueAtTime(
      0.08,
      this.backgroundSound.gain.context.currentTime + 10
    )
    this.backgroundSound.gain.gain.linearRampToValueAtTime(
      0.02,
      this.src.duration
    )
    // setTimeout(() => {
    //   this.setLoop()
    // }, (this.this.src.duration) * 1000)
  }
}
