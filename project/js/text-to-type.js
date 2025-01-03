var letterIndex = 0
var wordIndex = 0

var wordsCounter = new DataBinder(
    document.getElementsByClassName("statusbar__words_count")[0], 0)

var mistakesCounter = new DataBinder(
    document.getElementsByClassName("statusbar__mistakes_count")[0], 0)

var timeCounter = new DataBinder(
    document.getElementsByClassName("statusbar__timer_value")[0])

var timerDuration = 30 // In seconds

var timer = new CountDownTimer(timerDuration)
timer.onTick((mins, secs) => {
    secs = secs < 10 ? "0" + secs : secs
    timeCounter.change(mins + ":" + secs)
})

timer.onExpired(() => stopTyping())

timer.start()

var main = document.getElementsByClassName("main")[0]
var textToType = document.getElementsByClassName("text-to-type")[0]
var words = textToType.getElementsByClassName("word")

var currentWord = words[wordIndex]
var currentWordLettersCount = currentWord.children.length

// Init first letter
currentWord.children[letterIndex].classList.add("letter_current")

function typeLetter(e) {
    if (e.key == "Shift")
        return

    if (e.metaKey || e.ctrlKey || e.altKey)
        return

    if (e.key == " ")
        e.preventDefault()

    checkLetterCorrect(e.key)
    nextLetter()


}

function checkLetterCorrect(letter) {
    var letterElement = currentWord.children[letterIndex]
    var actualLetter = letterElement.innerHTML

    // Handling unicode space encounter
    if (actualLetter == "&nbsp;")
        actualLetter = " "

    console.log("Letter: " + letter)
    console.log("Actual letter: " + actualLetter)

    if (letter == actualLetter){
        letterElement.classList.add("letter_correct")
    }
    else {
        mistakesCounter.change(parseInt(mistakesCounter.element.innerHTML) + 1)
        letterElement.classList.add("letter_wrong")
    }
}

function nextWord() {
    wordIndex++
    wordsCounter.change(parseInt(wordsCounter.element.innerHTML) + 1)

    if (wordIndex == words.length){
        return false
    }
    else{
        currentWord = words[wordIndex]
        currentWordLettersCount = currentWord.children.length
        letterIndex = 0
        return true
    }
}

function nextLetter() {
    var oldLetterElement = currentWord.children[letterIndex]
    oldLetterElement.classList.remove("letter_current")

    letterIndex++

    // If the whole word has been typed...
    if (letterIndex == currentWordLettersCount) {
        // ...try to grab the next word
        if (!nextWord())
            stopTyping()

        if ((wordIndex + 1) % 10 == 0)
            scrollDown()
    }

    var newLetterElement = currentWord.children[letterIndex]
    newLetterElement.classList.add("letter_current")
}

function scrollDown() {
    console.log("SCROLL TRIGGERED")

    const wordElement = document.getElementsByClassName("word")[0]
    textToType.scrollTop += wordElement.scrollHeight;
}

async function stopTyping() {
    var totalWords = parseInt(wordsCounter.element.innerHTML)
    var totalMistakes = parseInt(mistakesCounter.element.innerHTML)

    var urlParams = new URLSearchParams({
        words: totalWords,
        mistakes: totalMistakes
    }).toString()

    let response_update = fetch("/update_user_stats?" + urlParams)

    let response_results = await fetch("/results?" + urlParams)
        .then(response => { return response.text() })
        .then(html => { htmx.swap("#main", html, { swapStyle: 'innerHTML' }) })
}

textToType.addEventListener("keydown", typeLetter)