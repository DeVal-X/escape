import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="mooving-effect-object"
export default class extends Controller {
  static targets = ["object", "floor"]

  moovingEffect(event) {
    const mouseX = event.clientX / window.innerWidth * 2;
    const mouseY = event.clientY / window.innerHeight * 2;
    const mouseXup = event.clientX / window.innerWidth * 4;
    const mouseYup = event.clientY / window.innerHeight * 4;
    this.objectTargets.forEach(object => {object.style.transform = `translate3d(-${mouseXup}%, -${mouseYup}%, 0)`});
    this.floorTargets.forEach(object => {object.style.transform = `perspective(14px) translate3d(-${mouseX}%, -${mouseY}%, 0) rotateX(3deg)`});
  }
}
;
