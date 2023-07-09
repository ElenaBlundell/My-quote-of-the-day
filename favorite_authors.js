import {favoriteAuthorsArr} from './data.js'
import {carouselButtons} from './carousel.js'


const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

const flexCardsCollection = document.getElementsByClassName("flex-card")

// this code also seems to be repeated... 
open.addEventListener("click", () => {
    const flexCardsArr = Array.from(flexCardsCollection)
    nav.classList.add("open-nav")
    carouselButtons.style.visibility = "hidden"
    flexCardsArr.forEach(card => {
        card.classList.add("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.add("disabled"))
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    carouselButtons.style.visibility = "visible"
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.classList.remove("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.remove("disabled"))
})

// Favorite Authors


const favoriteAuthors = get("favorite-authors")

function makeTopicsGrid() {
    favoriteAuthorsArr.forEach(author => {
        favoriteAuthors.innerHTML += `<div class="flex-card">
            <p>${author}</p>
        </div>`
    })
}

function authorQuoteHtml(data) {

    favoriteAuthors.innerHTML = `<div id="quote-block" class="quote-block">
        <p class="quote" id="quote">"${data.content}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data.author}</p>
        </div>
    </div>
    <div id="btn-block" class="btn-block">
        <a id="back-favorite-authors" href="favorite_authors.html" class="btn">Go back</a>
    </div>    
    `
    const btnBlock = get("btn-block")

    if(authorQuotesArr.length > 1){
        btnBlock.innerHTML += `
        <button id="next-quote-btn" class="btn">Next quote</button>
        `
        getNextQuote(authorQuotesArr)
    } 

    favoriteAuthors.classList.remove("flex-container")
    favoriteAuthors.classList.add("quote-card")
    
}

makeTopicsGrid()

let authorQuotesArr = []

function getAuthorQuotes() {
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            fetch(`https://api.quotable.io/quotes?author=${favoriteAuthorsArr[flexCardsArr.indexOf(card)]}`)
                .then(response => response.json())
                .then(data => {
                    authorQuotesArr = data.results
                    authorQuoteHtml(authorQuotesArr[0])
                })
        })
    })
}

getAuthorQuotes()

function getNextQuote(data) {
    const nextQuoteBtn = get("next-quote-btn")
    const quote = get("quote")
    const author = get("author")

    let nextQuote = data.shift()
    let nextQuoteIndex = 0
    
    nextQuoteBtn.addEventListener("click", () => {

        if (nextQuoteIndex === 0) {
            nextQuote = data.shift()
        }

        quote.innerHTML = `"${nextQuote.content}"`
        author.innerHTML = `${nextQuote.author}`

        nextQuote = data.shift()
        if (!nextQuote) {
            nextQuoteBtn.disabled = true
        }
        nextQuoteIndex++
    })
}