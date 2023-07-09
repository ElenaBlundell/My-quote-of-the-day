// Nice handling here. remove console.logs when done with development
import {
    imgQuote2,
    imgQuote3,
    carouselButtons
} from './carousel.js'

const logo = document.getElementById("logo")

const mediaQuerySmall = window.matchMedia("(max-width: 499px)")
const mediaQueryMedium = window.matchMedia("(min-width: 500px)")
const mediaQueryMediumL = window.matchMedia("(max-width: 749px)")
const mediaQueryLarge = window.matchMedia("(min-width: 750px)")

function handleScreenChangeSmall(e) {
    if (e.matches) {
        // console.log("It is small now!")
        imgQuote2.classList.remove("carousel-item-visible")
        logo.style.fontSize = "2rem"
    }
}

function handleScreenChangeMedium(e) {
    if (e.matches) {
        // console.log("Media Query Matched Medium!")
        imgQuote2.classList.add("carousel-item-visible")
        logo.style.fontSize = "2.5rem"
    }
}

function handleScreenChangeMediumL(e) {
    if (e.matches) {
        // console.log("it is mL now")
        imgQuote3.classList.remove("carousel-item-visible")
        carouselButtons.style.visibility = "visible"
    }
}

function handleScreenChangeLarge(e) {
    if (e.matches) {
        // console.log("It's large now")
        imgQuote3.classList.add("carousel-item-visible")
        carouselButtons.style.visibility = "hidden"
    }
}

// Register event listener
mediaQuerySmall.addEventListener("change", handleScreenChangeSmall)
mediaQueryMedium.addEventListener("change", handleScreenChangeMedium)
mediaQueryMediumL.addEventListener("change", handleScreenChangeMediumL)
mediaQueryLarge.addEventListener("change", handleScreenChangeLarge)

// Initial check
handleScreenChangeSmall(mediaQuerySmall)
handleScreenChangeMedium(mediaQueryMedium)
handleScreenChangeMediumL(mediaQueryMediumL)
handleScreenChangeLarge(mediaQueryLarge)