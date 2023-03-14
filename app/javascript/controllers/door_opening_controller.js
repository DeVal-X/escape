import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="door-opening"
export default class extends Controller {
  static values = { advancePath: String }

  grabKey(event) {
    alert('grab')
    event.currentTarget.disabled = true
    if (!this.keyFound) this.keyFound = event.params.goodKey
  }

  // open() {
  //   if (this.keyFound) {
  //     window.alert( "The door is open" )
  //   } else {
  //     window.alert( "Door is still locked" )
  //   }
  // }

  deactivateDoorTrap() {
    if (this.keyFound) {
      this.openDoorTwo()
    } else {
      this.playerDeath()
    }
  }

  openDoorTwo() {
    const options = {last_event: "success-open-door-two", successfull_challenges: "open-door-two" }
    this.#advanceGame(options)
  }

  playerDeath() {
    const options = {last_event: "player-is-dead", successfull_challenges: "player-died" }
    this.#advanceGame(options)
  }

  #advanceGame(options) {
    fetch(this.advancePathValue, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify(options)
    })
  }
}
