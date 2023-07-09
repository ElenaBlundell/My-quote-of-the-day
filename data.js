const baseUrl = "https://api.quotable.io"

const popularTopicsArr = ["Inspirational", "Love", "Happiness", "Success",
                       "Wisdom", "Friendship", "Motivational", "Change"]

// this can be a const I believe                      
let allTopicsArr = ["Sports", "Change", "History", "Friendship", "Wisdom",
                    "Philosophy", "Humorous", "Creativity", "Failure", "Imagination", "Competition",
                    "Virtue", "Freedom", "Future", "Happiness", "Inspirational",
                    "Honor", "Motivational", "Life", "Science", "Love", "Pain", "Gratitude",
                    "Success", "Time", "Technology", "Truth", "Work", "Social Justice", "Famous Quotes"]
allTopicsArr = allTopicsArr.sort()

// this can too
let favoriteAuthorsArr = ["Dalai Lama", "Albert Einstein", "Theodore Roosevelt",
                         "Ernest Hemingway", "Abraham Lincoln", "Maya Angelou", "Henry Ford",
                        "Oscar Wilde", "Dr. Seuss"]
favoriteAuthorsArr = favoriteAuthorsArr.sort()

export {baseUrl, popularTopicsArr, allTopicsArr, favoriteAuthorsArr}