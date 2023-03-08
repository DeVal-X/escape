import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="totem-switch"
export default class extends Controller {
  static targets = ["totem", "door"]


  switch(event) {
    if (event.currentTarget.className === "button-green") {
      event.currentTarget.classList.replace("button-green","button-blue")
    } else if (event.currentTarget.className === "button-blue") {
      event.currentTarget.classList.replace("button-blue","button-red")
    } else if (event.currentTarget.className === "button-red") {
      event.currentTarget.classList.replace("button-red","button-green")
    }

    if ( this.totemTargets[0].className === "button-green" && this.totemTargets[1].className === "button-green" && this.totemTargets[2].className === "button-green" ) {
      this.#advanceGame()
    }
  }

  #advanceGame() {
    const options = {last_event: "success-totem-switch", successfull_challenges: "totem-switch" }
    fetch("/games/1/advance", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify(options)
    })
  }

  unlock() {
    this.doorTarget.classList.remove("d-none")
  }
}

// &&
