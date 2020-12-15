import { words } from '/words.js'

const letters_element = document.querySelector('.letters')
const words_element = document.querySelector('.words')
const wordList_element = words_element.querySelector('.word-list')
const showLettersButton = words_element.querySelector('.show-letters')

const turkishWords = words.words
const longestTurkishWords = []

const turkishAlphabet = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y', 'z']

listLetters()

showLettersButton.addEventListener('click', _ => {
    words_element.style.display = 'none'
    letters_element.style.display = 'grid'
})

function wordsStartsWithLetter(letter) {
    const wordList = turkishWords.filter(turkishWord => turkishWord.startsWith(letter))

    wordList.forEach(word => {
        const wordListExists = longestTurkishWords.find(longestTurkishWord => longestTurkishWord.wordLength == word.length)
        if (wordListExists) {
            wordListExists.wordList.push(word)
        } else {
            longestTurkishWords.push({ wordLength: word.length, wordList: [word] })
        }
    })
    sortWords(letter, wordList.length)
}

function sortWords(letter, totalLength) {
    words_element.style.display = 'block'
    words_element.querySelector('.letter-info').textContent = `${letter} ile başlayan kelimeler`
    words_element.querySelector('.total-word-info').textContent = `${letter} harfi ile başlayan ${totalLength} kelime bulunuyor`
    wordList_element.innerHTML = longestTurkishWords.sort((a, b) => {
        if (a.wordLength < b.wordLength) {
            return 1
        } else {
            return 0
        }
    }).map(word => {
        return `
        <details>
            <summary>${word.wordLength} Harfli Kelimeler</summary>
            <ul>
                ${word.wordList.map(item => `<li>${item}</li>`).join('')}
            </ul>    
        </details>`
    }).join('')
}

function listLetters() {
    turkishAlphabet.forEach(letter => {
        const div = document.createElement('div')
        div.classList.add('letter')
        div.textContent = letter

        div.setAttribute('title', `${letter} harfi ile başlayan kelimeler`)

        div.addEventListener('click', _ => {
            wordsStartsWithLetter(letter)
            letters_element.style.display = 'none'
        })

        letters_element.appendChild(div)
    })
}
