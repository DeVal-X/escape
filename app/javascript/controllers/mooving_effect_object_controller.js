import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="mooving-effect-object"
export default class extends Controller {
  static targets = ["object"]
  connect() {
    console.log("coucou")
  }

  moovingEffect(event) {

    const mouseX = event.clientX / window.innerWidth * 4;
    const mouseY = event.clientY / window.innerHeight * 4;
    this.objectTarget.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
  }
}
