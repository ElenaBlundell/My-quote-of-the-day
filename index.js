import {allTopicsArr, baseUrl} from './data.js'
import {carouselButtons} from './carousel.js'

const get = element => document.getElementById(element)

// Access main page elements
const main = get("main")
const quoteBlock = get("quote-block")
const quoteBtn = get("get-quote-btn")
const btnBlock = get("btn-block")
// const addBtn = get("add-btn") Make a list of favorite quotes

const quote = get("quote")
const author = get("author")


// HEADER
const searchIcon = get("search-icon")

searchIcon.addEventListener("click", () => {
    searchContainer.classList.remove("none")
})

// NAVIGATIN MENU
const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

open.addEventListener("click", () => {
    nav.classList.add("open-nav")
    searchContainer.classList.add("none")
    searchIcon.classList.add("disabled")
    carouselButtons.style.visibility = "hidden"
    quoteBtn.disabled = true
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    searchIcon.classList.remove("disabled")
    carouselButtons.style.visibility = "visible"
    quoteBtn.disabled = false
})

// SEARCH FIELD

const searchContainer = get("search-container")
const searchForm = get("search-form")
const searchBar = get("search-bar")
const searchBtn = get("search-btn")
let authorsList = []
let authorsSearchResult = []
let topicSearchResult = ""
let quotesArr = []

searchForm.addEventListener("submit", function (e) {
    e.preventDefault()
})

// SEARCH

// Getting a list of authors that stored in the data base
getAuthorsList()

// Recursive function, that querying page after page until all pages data is stored in authorsList
function getAuthorsList(pageNum = 1) {
    fetch(`${baseUrl}/authors?sortBy=name&page=${pageNum}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(result => authorsList.push(result.name))
            if (pageNum !== data.totalPages){
                pageNum++
                return getAuthorsList(pageNum)
            }
        })
}
// Step 1.1 QUOTES. Check if the search bar value is an existing topic

searchBtn.addEventListener("click", function () {

    topicSearchResult = ""

    let lowerCaseTopicsArr= allTopicsArr.map(topic => topic.toLowerCase())
    lowerCaseTopicsArr.forEach(topic => {
        if (topic.includes(searchBar.value.toLowerCase())) {
            topicSearchResult = topic
        }
    })

    return (topicSearchResult) ? getTopicQuotes(topicSearchResult) : searchQuote()
})

// Step 1.2 QUOTES. Check if the search bar value can be found in a quote.
//      (Store all found quotes for a searched value in an array and check if it's empty or not)

async function searchQuote() {
    quotesArr = []
    const res = await fetch(`${baseUrl}/search/quotes?query=${searchBar.value}&limit=150`)
    const data = await res.json()
    data.results.forEach(result => quotesArr.push({
        "content": result.content,
        "author": result.author
        }))
    
    return (quotesArr.length !== 0) ? quoteCardHtml(quotesArr) : searchAuthor()
}

// Step 1.3 Check if the search bar value is an existing author's name

function searchAuthor(){
    authorsSearchResult = []
    let lowerCaseAuthorsList = authorsList.map(author => author.toLowerCase())
    lowerCaseAuthorsList.forEach(author => {

        if (author.includes(searchBar.value.toLowerCase())) {
            authorsSearchResult.push(authorsList[lowerCaseAuthorsList.indexOf(author)])
        }
    })
    return (authorsSearchResult.length !== 0) ? authorsListHtml() : alert(`No quotes for your request were found`)
}

// Step 2.QUOTES. Get an array of quotes for a searched topic

let topicQuotesArr = []

function getTopicQuotes(topic){
    
    fetch(`${baseUrl}/quotes?tags=${topic}&limit=150`)
                .then(response => response.json())
                .then(data => {
                    topicQuotesArr = data.results
                    quoteCardHtml(topicQuotesArr)
                })      
}

// Step 3.QUOTES. Display a quote for a surched topic

function quoteCardHtml(data) {
    
    if(!get("quote-block")){
        main.innerHTML = `<div id="quote-block" class="quote-block"></div>
                          <div id="btn-block" class="btn-block"></div>`
    }
    const quoteBlock = get("quote-block")

    quoteBlock.innerHTML = `
            <p class="quote" id="quote">"${data[0].content}"</p>
            <div class="author">
                <img src="images/palm.png">
            <p id="author">${data[0].author}</p>
            </div>
    `
    
    const btnBlock = get("btn-block")
    btnBlock.innerHTML = `<a href="index.html" class="btn">Go back</a>`

    if(data.length > 1){
            btnBlock.innerHTML += `
            <button id="next-quote-btn" class="btn">Next quote</button>
            `
            getNextQuote(data)
        } 
}

// Step 2.AUTHORS. Display a list of options for a surched author

let authorsCardsList

function authorsListHtml() {
    main.innerHTML = `<div id="authors-list" class="flex-container"></div>`
    authorsCardsList = get("authors-list")
    authorsSearchResult.forEach(author => {
        authorsCardsList.innerHTML += `<div class="flex-card">
                                            <p>${author}</p>
                                       </div>`
    })
    getAuthorQuotes()
}

// Step 3.AUTHORS. Get a quote from a chosen(clicked on) author

let authorQuotesArr = []

function getAuthorQuotes() {
    let authorsCardsCollection = document.getElementsByClassName("flex-card")
    const authorsCardsArr = Array.from(authorsCardsCollection)
    authorsCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            fetch(`https://api.quotable.io/quotes?author=${authorsSearchResult[authorsCardsArr.indexOf(card)]}`)
                .then(response => response.json())
                .then(data => {
                    authorQuotesArr = data.results
                    if(authorQuotesArr.length !== 0){
                        authorQuoteHtml(authorQuotesArr[0])
                    }
                    
                })
        })
    })
}

// Step 4.AUTHORS. Display a quote from a chosen(clicked) author

function authorQuoteHtml(data) {

    authorsCardsList.innerHTML = `<div id="new-quote-block" class="quote-block">
        <p class="quote" id="quote">"${data.content}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data.author}</p>
        </div>
    </div>
    <div id="btn-block" class="btn-block">
         <a href="index.html" class="btn">Go back</a>
    </div>    
    `
    authorsCardsList.classList.remove("flex-container")
    authorsCardsList.classList.add("quote-card")

    if(authorQuotesArr.length > 1){
        const btnBlock = get("btn-block")
        btnBlock.innerHTML += `<button id="next-quote-btn" class="btn">Next quote</button>`
        getNextQuote(authorQuotesArr)
    } 
}

// Step 5. Display next quote for a chosen author/topic after a click on a "Next quote" button

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

// GET A RANDOM QUOTE

quoteBtn.addEventListener("click", () => {
    fetch(`${baseUrl}/random`)
        .then(response => response.json())
        .then(data => {
            quoteBlock.innerHTML = getQuoteHtml(data)
        })
})

function getQuoteHtml(data) {
    return `
            <p class="quote">"${data.content}"</p>
            <div class="author">
                <img src="images/palm.png">
            <p>${data.author}</p>
            </div>`
}

// function getAuthorImg(data){
//     let authorImgSource = ""
//     let author = data.author
//     let authorFetch = author.replace(/ /g, "%20")
//     console.log(authorFetch)
//     fetch(`https://en.wikipedia.org/w/api.php?action=query&
//                 titles=${authorFetch}&formatversion=2&prop=pageimages&format=json&pithumbsize=250`)
//             .then(response => response.json())
//             .then(img => {
//                 console.log(img.query.pages[0].thumbnail.source)
//                 authorImgSource = img.query.pages[0].thumbnail.source
//             })
//             return authorImgSource
// }