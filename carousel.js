// well done.
import {baseUrl} from './data.js'

const get = element => document.getElementById(element)

// const carousel = get("carousel")
const slides = document.getElementsByClassName('carousel-item')
let slidePosition = 0
const totalSlides = slides.length
export const carouselButtons = get("carousel-buttons")
export const imgQuote2 = get("img-quote-2")
export const imgQuote3 = get("img-quote-3")

document.getElementById('carousel-button-next').addEventListener("click", moveToNextSlide);
document.getElementById('carousel-button-prev').addEventListener("click", moveToPrevSlide);

function hideAllSlides() {
    for (let slide of slides) {
        slide.classList.remove("carousel-item-visible");
        slide.classList.add("carousel-item-hidden");
    }
}

function moveToNextSlide() {
    hideAllSlides();

    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

    slides[slidePosition].classList.add("carousel-item-visible");
}

function moveToPrevSlide() {
    hideAllSlides();

    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }

    slides[slidePosition].classList.add("carousel-item-visible");
}

// Random Quote for each slide

let slidesDom = document.getElementsByClassName("carousel-item")
const slidesArr = Array.from(slidesDom)

function randomSlideQuote(){
    
    slidesArr.forEach(slide => {
        fetch(`${baseUrl}/random?minLength=40&maxLength=50`)
            .then(res => res.json())
            .then(data => slide.innerHTML = getSlideQuoteHtml(data))
    })
}

randomSlideQuote()

function getSlideQuoteHtml(data){
    return `<p class="quote">"${data.content}"</p>
            <div class="author">
                <img src="images/palm.png">
                <p>${data.author}</p>
            </div>`
}
