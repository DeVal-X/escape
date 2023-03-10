import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="game-subscription"
export default class extends Controller {
  static values = { gameId: Number }
  static targets = ["lever", "door", "lobbyFull", "gameWait", "gameStart", "gameDead", "gameEnded", "gameLevel1", "gameLevel2", "gameScore" ]

  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      { received: data => this.#advanceGame(data) }
    )
    console.log(`currently listening on channel game id:${this.gameIdValue}.`)
  }

  #advanceGame(data) {
    console.log(data)

    if (data.last_event === "start-game") {
      this.lobbyFullTarget.classList.add("d-none")
      this.gameLevel1Target.classList.remove("d-none")
    }

    if (data.last_event === "player-is-dead") {
      this.currentTarget.classList.add("d-none")
      this.gameDeadTarget.classList.remove("d-none")
    }

    if (data.last_event === "success-open-door-one") {
      this.gameLevel1Target.classList.add("d-none")
      this.gameLevel2Target.classList.remove("d-none")
    }

    if (data.last_event === "success-open-door-two") {
      this.gameLevel2Target.classList.add("d-none")
      this.gameEndedTarget.classList.remove("d-none")
    }

    if (data.last_event === "success-open-score-board") {
      this.currentTarget.classList.add("d-none")
      this.gameScoreTarget.classList.remove("d-none")
    }

    if (this.hasLeverTarget && data.successfull_challenges.includes("totem-switch")) {
      this.leverTarget.classList.remove("d-none")
    }

    if (this.hasDoorTarget && data.successfull_challenges.includes("lever-switch")) {
      this.doorTarget.classList.remove("d-none")
    }


  }
}
