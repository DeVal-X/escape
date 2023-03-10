import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["totem","lever", "door", "waitingRoom"]
  static values = { advancePath: String }

  startGame() {
    const options = {last_event: "start-game", successfull_challenges: "start-game" }
    this.#advanceGame(options)
  }

  switch(event) {
    if (event.currentTarget.className === "button-green") {
      event.currentTarget.classList.replace("button-green","button-blue")
    } else if (event.currentTarget.className === "button-blue") {
      event.currentTarget.classList.replace("button-blue","button-red")
    } else if (event.currentTarget.className === "button-red") {
      event.currentTarget.classList.replace("button-red","button-green")
    }
    if ( this.totemTargets[0].className === "button-green" && this.totemTargets[1].className === "button-green" && this.totemTargets[2].className === "button-green" ) {
      const options = {last_event: "success-totem-switch", successfull_challenges: "totem-switch" }
      this.#advanceGame(options)
    }
  }

  unlock() {
    // this.doorTarget.classList.remove("d-none")
    const options = {last_event: "success-lever-switch", successfull_challenges: "lever-switch" }
    this.#advanceGame(options)
  }

  openDoorOne() {
    const options = {last_event: "success-open-door-one", successfull_challenges: "open-door-one" }
    this.#advanceGame(options)
  }

  openDoorTwo() {
    const options = {last_event: "success-open-door-two", successfull_challenges: "open-door-two" }
    this.#advanceGame(options)
  }

  victoryDoor() {
    const options = {last_event: "", successfull_challenges: "" }
    this.#advanceGame(options)
  }

  scoreBoard() {
    const options = {last_event: "sucess-open-score-board", successfull_challenges: "open-score-board" }
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
