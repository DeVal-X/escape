import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="instruction-paper"
export default class extends Controller {
  open() {
      window.alert( "bha écoute je suis arrivé dans un salon, il y a pas mal d'informations. J'ai un bout de papier devant moi avec une petite note, je te la lis tout de suite : Elle se cache dans le savoir et vous donnera espoir")
  }
}
