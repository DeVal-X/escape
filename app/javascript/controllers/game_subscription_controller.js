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
    'doorUser1',
    'carpetUser1',
    'chairUser1',
    'floorUser1',
    'frame101User1',
    'frame102User1',
    'frame103User1',
    'frame104User1',
    'frame105User1',
    'frame1And2User1',
    'frame3User1',
  ]

  displayRoom1(addClass = true) {
    this.Target.classList.toggle('fade-in-chandelier-n-r', addClass)
    this.Target.classList.toggle('fade-in-door-n-r', addClass)
    this.Target.classList.toggle('fade-in-chandelier-n', addClass)
    this.Target.classList.toggle('chair', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
    this.Target.classList.toggle('chandelier', addClass)
  }

  hideRoom1() {
    this.displayRoom1(false)
    this.frame1Target.classList.add('fade-in-chandelier-n-r')
    this.targets.classlist.add('fade-in-door-n-r')
    this.targets.classlist.add('fade-in-chandelier-n-r')
    this.targets.classlist.add('fade-in-carpet-n-r')
    this.targets.classlist.add('fade-in-chair-e-r')
    this.targets.classlist.add('fade-in-floor-s-r')
    this.targets.classlist.add('fade-in-frame101-w-r')
    this.targets.classlist.add('fade-in-frame102-e-r')
    this.targets.classlist.add('fade-in-frame103-w-r')
    this.targets.classlist.add('fade-in-frame104-e-r')
    this.targets.classlist.add('fade-in-frame105-e-r')
    this.targets.classlist.add('fade-in-frame1-2-w-r')
    this.targets.classlist.add('fade-in-frame3-e-r')
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
      if (this.hasGameLevel1Target) this.hideRoom1()
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
