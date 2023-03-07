import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="door-opening"
export default class extends Controller {

  grabKey(event) {
    event.currentTarget.disabled = true
    if (!this.keyFound) this.keyFound = event.params.goodKey
  }

  open() {
    if (this.keyFound) {
      window.alert( "The door is open" )
    } else {
      window.alert( "Door is still locked" )
    }
  }
}
