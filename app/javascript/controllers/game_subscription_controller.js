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
    "frame1User1Room1",
    "frame2User1Room1",
    "frame3User1Room1",
    "lustreUser1Room2",
    "doorUser1Room2",
    "carpetUser1Room2",
    "floorUser1Room2",
    "bombonneUser1Room2",
    "chemineUser1Room2",
    "bureauUser1Room2",
    "livreUser1Room2",
    "bougieUser1Room2",
    "pile2User1Room2",
    "pile1User1Room2",
    "buffetUser1Room2",
    "clef1User1Room2",
    "clef2User1Room2",
    "clef3User1Room2"
  ]

  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      { received: data => this.#advanceGame(data) }
    )
    console.log(`currently listening on channel game id:${this.gameIdValue}.`)
  }

  disconnect() {
    this.channel.unsubscribe()
  }

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
    this.frame1User1Room1Target.classList.toggle('fade-in-frame1-w', addClass)
    this.frame2User1Room1Target.classList.toggle('fade-in-frame2-w', addClass)
    this.frame3User1Room1Target.classList.toggle('fade-in-frame3-e', addClass)
  }

  displayRoom2(addClass = true) {
    this.gameLevel1Target.classList.add("d-none")
    this.gameLevel2Target.classList.remove("d-none")
    this.lustreUser1Room2Target.classList.toggle("fade-in-lustre-n", addClass)
    this.doorUser1Room2Target.classList.toggle("fade-in-door-bis-n", addClass)
    this.carpetUser1Room2Target.classList.toggle("fade-in-carpet-bis-se", addClass)
    this.floorUser1Room2Target.classList.toggle("fade-in-floor-bis-s", addClass)
    this.bombonneUser1Room2Target.classList.toggle("fade-in-bombonne-ne", addClass)
    this.chemineUser1Room2Target.classList.toggle("fade-in-chemine-ne", addClass)
    this.bureauUser1Room2Target.classList.toggle("fade-in-bureau-sw", addClass)
    this.livreUser1Room2Target.classList.toggle("fade-in-livre-se", addClass)
    this.bougieUser1Room2Target.classList.toggle("fade-in-bougie-se", addClass)
    this.pile2User1Room2Target.classList.toggle("fade-in-pile2-se", addClass)
    this.pile1User1Room2Target.classList.toggle("fade-in-pile1-se", addClass)
    this.buffetUser1Room2Target.classList.toggle("fade-in-buffet-sw", addClass)
    this.clef1User1Room2Target.classList.toggle("fade-in-clef1-sw", addClass)
    this.clef2User1Room2Target.classList.toggle("fade-in-clef2-ne", addClass)
    this.clef3User1Room2Target.classList.toggle("fade-in-clef3-se", addClass)
  }


  callReverse(target, className) {
    target.classList.add(className)
  }

  hideRoom1() {
    this.displayRoom1(false)
    this.callReverse(this.chandelierUser1Room1Target,"fade-in-chandelier-n-r")
    this.callReverse(this.doorUser1Room1Target, 'fade-in-door-n-r')
    this.callReverse(this.carpetUser1Room1Target, 'fade-in-carpet-n-r')
    this.callReverse(this.chairUser1Room1Target, 'fade-in-chair-e-r')
    this.callReverse(this.floorUser1Room1Target, 'fade-in-floor-s-r')
    this.callReverse(this.frame101User1Room1Target, 'fade-in-frame101-w-r')
    this.callReverse(this.frame102User1Room1Target, 'fade-in-frame102-e-r')
    this.callReverse(this.frame103User1Room1Target, 'fade-in-frame103-w-r')
    this.callReverse(this.frame104User1Room1Target, 'fade-in-frame104-e-r')
    this.callReverse(this.frame105User1Room1Target, 'fade-in-frame105-e-r')
    this.callReverse(this.frame1User1Room1Target, 'fade-in-frame1-w-r')
    this.callReverse(this.frame2User1Room1Target, 'fade-in-frame2-w-r')
    this.callReverse(this.frame3User1Room1Target, 'fade-in-frame3-e-r')
  }

  hideRoom2() {
    this.displayRoom2(false)
    this.callReverse(this.lustreUser1Room2Target, "fade-in-lustre-n-r")
    this.callReverse(this.doorUser1Room2Target, "fade-in-door-bis-n-r")
    this.callReverse(this.carpetUser1Room2Target, "fade-in-carpet-bis-se-r")
    this.callReverse(this.floorUser1Room2Target, "fade-in-floor-bis-s-r")
    this.callReverse(this.bombonneUser1Room2Target, "fade-in-bombonne-ne-r")
    this.callReverse(this.chemineUser1Room2Target, "fade-in-chemine-ne-r")
    this.callReverse(this.bureauUser1Room2Target, "fade-in-bureau-sw-r")
    this.callReverse(this.livreUser1Room2Target, "fade-in-livre-se-r")
    this.callReverse(this.bougieUser1Room2Target, "fade-in-bougie-se-r")
    this.callReverse(this.pile2User1Room2Target, "fade-in-pile2-se-r")
    this.callReverse(this.pile1User1Room2Target, "fade-in-pile1-se-r")
    this.callReverse(this.buffetUser1Room2Target, "fade-in-buffet-sw-r")
    this.callReverse(this.clef1User1Room2Target, "fade-in-clef1-sw-r")
    this.callReverse(this.clef2User1Room2Target, "fade-in-clef2-ne-r")
    this.callReverse(this.clef3User1Room2Target, "fade-in-clef3-se-r")

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
      }
      if (this.hasGameLevel2Target) {
        setTimeout(() => {this.displayRoom2()}, 5.5 * 1000)

      }
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
