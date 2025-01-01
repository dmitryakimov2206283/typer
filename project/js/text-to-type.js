let letterIndex = 0
let wordIndex = 0

var textToType = document.getElementsByClassName("text-to-type")[0]
var words = textToType.getElementsByClassName("word")

var currentWord = words[wordIndex]
var currentWordLettersCount = currentWord.children.length

function typeLetter(e) {
    if (e.key == "Shift")
        return

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

    if (letter == actualLetter)
        letterElement.classList.add("letter_correct")
    else
        letterElement.classList.add("letter_wrong")
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