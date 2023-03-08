import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="game-subscription"
export default class extends Controller {
  static values = { gameId: Number }
  static targets = ["lever", "door"]

  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      { received: data => this.#advanceGame(data) }
    )
    console.log(`currently listening on channel game id:${this.gameIdValue}.`)
  }

  #advanceGame(data) {
    console.log(data)
    // console.log(data.successfull_challenges.includes())

    if (this.hasLeverTarget && data.successfull_challenges.includes("totem-switch")) {
      this.leverTarget.classList.remove("d-none")
    }

    if (this.hasDoorTarget && data.successfull_challenges.includes("lever-switch")) {
      this.doorTarget.classList.remove("d-none")
    }

  }
}
