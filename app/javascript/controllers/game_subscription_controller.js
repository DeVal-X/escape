import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="game-subscription"
export default class extends Controller {
  static values = { gameId: Number }
  static targets = [
    "lever",
    "door",
    "pending",
    "lobbyFull",
    "gameWait",
    "gameStart",
    "gameDead",
    "gameEnded",
    "gameLevel1",
    "gameLevel2",
    "gameScore"
  ]


  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      { received: data => this.#advanceGame(data) }
    )
    console.log(`currently listening on channel game id:${this.gameIdValue}.`)
  }

  #advanceGame(data) {
    console.log(data)

    if (data.status === "lobby_full") {
      console.log('LOBBY FULL')
      if (this.hasPendingTarget) this.pendingTarget.classList.add("d-none")
      if (this.hasLobbyFullTarget) this.lobbyFullTarget.classList.remove("d-none")
    }

    if (data.last_event === "start-game") {
      const customGameEvent = new CustomEvent('game:start')
      document.dispatchEvent(customGameEvent)
      if (this.hasLobbyFullTarget ) { this.lobbyFullTarget.classList.add("d-none") }
      if (this.hasGameLevel1Target ) {
        this.gameLevel1Target.classList.remove("d-none", "hidden-object")
        this.gameLevel1Target.classList.add("displayed-object")
      }
    }

    if (data.last_event === "player-is-dead") {
      if (this.hasGameLevel1Target ) { this.gameLevel1Target.classList.add("d-none") }
      if (this.hasGameLevel2Target ) { this.gameLevel2Target.classList.add("d-none") }
      if (this.hasGameDeadTarget) this.gameDeadTarget.classList.remove("d-none")
    }

    if (data.last_event === "success-open-door-one") {
      if (this.hasGameLevel1Target )this.gameLevel1Target.classList.add("d-none")
      if (this.hasGameLevel2Target) this.gameLevel2Target.classList.remove("d-none")
    }

    if (data.last_event === "success-open-door-two") {
      if (this.hasGameLevel2Target ) this.gameLevel2Target.classList.add("d-none")
      if (this.hasGameEndedTarget) this.gameEndedTarget.classList.remove("d-none")
    }

    if (data.last_event === "success-open-score-board") {
      if (this.hasGameLevel1Target ) this.currentTarget.classList.add("d-none")
      if (this.hasGameScoreTarget) this.gameScoreTarget.classList.remove("d-none")
    }

    if (this.hasLeverTarget && data.successfull_challenges && data.successfull_challenges.includes("totem-switch")) {
      if (this.hasLeverTarget) this.leverTarget.classList.remove("d-none")
    }

    if (this.hasDoorTarget && data.successfull_challenges && data.successfull_challenges.includes("lever-switch")) {
      if (this.hasDoorTarget) this.doorTarget.classList.remove("d-none")
    }


  }
}
