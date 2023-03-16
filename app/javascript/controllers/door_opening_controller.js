import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="door-opening"
export default class extends Controller {
  static values = { advancePath: String }

  grabKey(event) {
    // alert('Vous avez trouvé un clef')
    event.currentTarget.disabled = true
    console.log(event.params.goodKey)
    console.log(event.currentTarget)
    this.keyFoundValue = event.params.goodKey

    console.log(this.keyFoundValue)
  }

  deactivateDoorTrap() {
    if (this.keyFoundValue === true || this.keyFoundValue === false){
      if (this.keyFoundValue) {
        this.openDoorTwo()
      } else {
        this.playerDeath()
      }
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
