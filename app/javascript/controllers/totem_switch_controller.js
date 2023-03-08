import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="totem-switch"
export default class extends Controller {
  static targets = ["totem", "door"]
  static values = { advancePath: String }

  connect() {

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
