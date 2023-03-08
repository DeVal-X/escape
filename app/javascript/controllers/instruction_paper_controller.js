import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="instruction-paper"
export default class extends Controller {
  open() {
      window.alert( "Finds the keys, the first with several legs, the second with warm and the third drowns ... Only one key opens the door, the others active traps.." )
  }
}
