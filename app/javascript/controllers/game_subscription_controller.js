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
    "gameScore",
    "chandelierUser1Room1",
    "doorUser1Room1",
    "carpetUser1Room1",
    "chairUser1Room1",
    "floorUser1Room1",
    "frame101User1Room1",
    "frame102User1Room1",
    "frame103User1Room1",
    "frame104User1Room1",
    "frame105User1Room1",
    "frame1And2User1Room1",
    "frame3User1Room1"
  ]

  displayRoom1(addClass = true) {
    this.chandelierUser1Room1Target.classList.toggle('fade-in-chandelier-n', addClass)
    this.doorUser1Room1Target.classList.toggle('fade-in-door-n', addClass)
    this.carpetUser1Room1Target.classList.toggle('fade-in-carpet-n', addClass)
    this.chairUser1Room1Target.classList.toggle('fade-in-chair-e', addClass)
    this.floorUser1Room1Target.classList.toggle('fade-in-floor-s', addClass)
    this.frame101User1Room1Target.classList.toggle('fade-in-frame101-w', addClass)
    this.frame102User1Room1Target.classList.toggle('fade-in-frame102-e', addClass)
    this.frame103User1Room1Target.classList.toggle('fade-in-frame103-w', addClass)
    this.frame104User1Room1Target.classList.toggle('fade-in-frame104-e', addClass)
    this.frame105User1Room1Target.classList.toggle('fade-in-frame105-e', addClass)
    this.frame1And2User1Room1Target.classList.toggle('fade-in-frame1-2-w', addClass)
    this.frame3User1Room1Target.classList.toggle('fade-in-frame3-e', addClass)
  }

  displayRoom2(addClass = true) {
    // this.carpetUser1Room2Target.classList.toggle('fade-in-chandelier-n', addClass)
  }

  hideRoom1() {
    this.displayRoom1(false)
    this.chandelierUser1Room1Target.classList.toggle('fade-in-chandelier-n-r')
    this.doorUser1Room1Target.classList.toggle('fade-in-door-n-r')
    this.carpetUser1Room1Target.classList.toggle('fade-in-carpet-n-r')
    this.chairUser1Room1Target.classList.toggle('fade-in-chair-e-r')
    this.floorUser1Room1Target.classList.toggle('fade-in-floor-s-r')
    this.frame101User1Room1Target.classList.toggle('fade-in-frame101-w-r')
    this.frame102User1Room1Target.classList.toggle('fade-in-frame102-e-r')
    this.frame103User1Room1Target.classList.toggle('fade-in-frame103-w-r')
    this.frame104User1Room1Target.classList.toggle('fade-in-frame104-e-r')
    this.frame105User1Room1Target.classList.toggle('fade-in-frame105-e-r')
    this.frame1And2User1Room1Target.classList.toggle('fade-in-frame1-2-w-r')
    this.frame3User1Room1Target.classList.toggle('fade-in-frame3-e-r')
  }

  hideRoom2() {
    this.displayRoom2(false)
    // this.carpetUser1Room2Target.classList.toggle('fade-in-chandelier-n-r')
  }

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
      // const customGameEvent = new CustomEvent('game:start')
      // document.dispatchEvent(customGameEvent)
      if (this.hasLobbyFullTarget ) { this.lobbyFullTarget.classList.add("d-none") }
      if (this.hasGameLevel1Target ) {
        this.gameLevel1Target.classList.remove("d-none")
      }
    }

    if (data.last_event === "player-is-dead") {
      if (this.hasGameLevel1Target ) { this.gameLevel1Target.classList.add("d-none") }
      if (this.hasGameLevel2Target ) { this.gameLevel2Target.classList.add("d-none") }
      if (this.hasGameDeadTarget) this.gameDeadTarget.classList.remove("d-none")
    }

    if (data.last_event === "success-open-door-one") {
      if (this.hasGameLevel1Target) {
        this.hideRoom1()
        this.displayRoom2()
      }
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
