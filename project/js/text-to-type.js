let letterIndex = 0
let wordIndex = 0

let mistakesCounter = new DataBinder(
    document.getElementsByClassName("statusbar__mistakes_count")[0], 0)

let timerDuration = 30 // In seconds

let timeCounter = new DataBinder(
    document.getElementsByClassName("statusbar__timer_value")[0]
)

let timer = new CountDownTimer(timerDuration)
timer.onTick((mins, secs) => {
    secs = secs < 10 ? "0" + secs : secs
    timeCounter.change(mins + ":" + secs)
})
    .onExpired(() => alert("Time is up!"))

timer.start()

var textToType = document.getElementsByClassName("text-to-type")[0]
var words = textToType.getElementsByClassName("word")

var currentWord = words[wordIndex]
var currentWordLettersCount = currentWord.children.length

function typeLetter(e) {
    if (e.key == "Shift")
        return

    if (e.key == " ")
        e.preventDefault()

    checkLetterCorrect(e.key)
    letterIndex++

    // If the whole word has been typed...
    if (letterIndex == currentWordLettersCount)
        // ...try to grab the next word
        if (!nextWord()){
            alert("No more words left!")
            textToType.removeAttribute("tabIndex")
        }
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

textToType.addEventListener("keydown", typeLetter)