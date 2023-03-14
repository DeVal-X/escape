import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="mooving-effect-object"
export default class extends Controller {
  static targets = ["object", "floor", "chair", "carpet"]

  connect() {
    // console.log('coucou je suis le moving controller')
    // document.addEventListener('game:start', () => {
    //   console.log('coucou je suis le moving controller et je suis declenché au start')
    // })
    const mouseX = 0
    const mouseY = 0
    const mouseXdown = 0
    const mouseYdown = 0
    const mouseXup = 0
    const mouseYup = 0
    this.objectTargets.forEach(object => {object.style.transform = `translate3d(-${mouseXup}%, -${mouseYup}%, 0)`});
    this.chairTargets.forEach(object => {object.style.transform = `translate3d(-${mouseXdown}%, -${mouseYdown}%, 0)`});
    this.floorTargets.forEach(object => {object.style.transform = `perspective(14px) translate3d(-${mouseX}%, -${mouseY}%, 0) rotateX(3deg)`});
    document.addEventListener('mousemove', this.moovingEffect.bind(this))
  }

  moovingEffect(event) {
    const mouseX = event.clientX / window.innerWidth * 0.3;
    const mouseY = event.clientY / window.innerHeight * 0.3;
    const mouseXdown = event.clientX / window.innerWidth * 2;
    const mouseYdown = event.clientY / window.innerHeight * 2;
    const mouseXup = event.clientX / window.innerWidth * 4;
    const mouseYup = event.clientY / window.innerHeight * 4;
    this.objectTargets.forEach(object => {object.style.transform = `translate3d(-${mouseXup}%, -${mouseYup}%, 0)`});
    this.chairTargets.forEach(object => {object.style.transform = `translate3d(-${mouseXdown}%, -${mouseYdown}%, 0)`});
    this.carpetTargets.forEach(object => {object.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`});
    this.floorTargets.forEach(object => {object.style.transform = `perspective(14px) translate3d(-${mouseX}%, -${mouseY}%, 0) rotateX(3deg)`});
  }
}
