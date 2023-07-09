// Overall I think this code is well-written. I think a few code comments could be helpful... maybe just to note which element of the DOM something is being rendered to. When done with development, you should remove commented out code.
import {baseUrl} from "./data.js"
import {carouselButtons} from './carousel.js'

// I like this!
const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

const carousel = get("carousel")

const flexCardsCollection = document.getElementsByClassName("flex-card")

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
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.classList.remove("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.remove("disabled"))
    carouselButtons.style.visibility = "visible"
})

// ALL TOPICS

import {allTopicsArr} from './data.js'

const allTopics = get("all-topics")

function makeTopicsGrid() {
    allTopicsArr.forEach(topic => {
        allTopics.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
    })
}

const main = get("main")

function topicQuoteHtml(data, section) {
    section.innerHTML = `<div id="quote-block" class="quote-block">
        <p class="quote" id="quote">"${data[0].content}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data[0].author}</p>
        </div>
    </div>
    <div id="btn-block" class="btn-block">
    </div>    
    `
    const btnBlock = get("btn-block")
    btnBlock.innerHTML = `<a href="all_topics.html" class="btn">Go back</a>`

    if(data.length > 1){
        btnBlock.innerHTML += `
        <button id="next-quote-btn" class="btn">Next quote</button>
        `
        getNextQuote(data)
    } 

    // allTopics.classList.remove("flex-container")
    // allTopics.classList.add("quote-card")
}

makeTopicsGrid()


let topicQuotesArr = []
const topicName = get("topic-name")

// function getTopicQuotes() {
//     const flexCardsArr = Array.from(flexCardsCollection)
//     flexCardsArr.forEach(card => {
//         let cardName = allTopicsArr[flexCardsArr.indexOf(card)]
//         card.addEventListener("click", () => {
//             topicName.textContent = cardName
//             topicName.classList.remove("hidden")
//             fetch(`${baseUrl}/quotes?tags=${cardName}&limit=150`)
//                 .then(response => response.json())
//                 .then(data => {
//                     topicQuotesArr = data.results
//                     topicQuoteHtml(topicQuotesArr[0])

//                 })
//         })
//     })
// }

function getTopicCards() {
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        let cardName = allTopicsArr[flexCardsArr.indexOf(card)]
        card.addEventListener("click", () => {
    
            (cardName !== "Famous Quotes") ? topicName.textContent = `${cardName} Quotes`
                                           : topicName.textContent = cardName
            topicName.classList.remove("hidden")
            allTopics.classList.remove("flex-container")
            allTopics.classList.add("quote-card")
            getTopicQuotes(cardName)
        })
    })
}

function getTopicQuotes(topic){
    fetch(`${baseUrl}/quotes?tags=${topic}&limit=150`)
                .then(response => response.json())
                .then(data => {
                    topicQuotesArr = data.results
                    topicQuoteHtml(topicQuotesArr, allTopics)
                })
}

getTopicCards()

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