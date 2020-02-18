const badWordsList = require('badwords-list')
const randomWords = require('./randomWords')
const nouns = require('nouns')

function random(min, max) {
  return parseInt(Math.random() * (max - min) + min)
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array
}

function generateCleanWords(length = 4) {
  const wordList = randomWords
  const output = []

  for (let index = 0; index < length; index++) {
    try {
      const randomIndex = random(0, wordList.length -1)
      const randomWord = wordList[randomIndex]

      const titleCaseWord = `${randomWord.charAt(0).toUpperCase()}${randomWord.substr(1).toLowerCase()}`
      output.push(titleCaseWord)
      wordList[randomIndex] = undefined
      delete wordList[randomIndex]
    } catch(err) {
      index = index - 1
    }
  }

  return output
}

function generateBadWords(length = 4) {
  const wordList = badWordsList.array
  const output = []

  for (let index = 0; index < length; index++) {
    try {
      const randomIndex = random(0, wordList.length -1)
      const randomWord = wordList[randomIndex]

      const titleCaseWord = `${randomWord.charAt(0).toUpperCase()}${randomWord.substr(1).toLowerCase()}`
      output.push(titleCaseWord)
      wordList[randomIndex] = undefined
      delete wordList[randomIndex]
    } catch(err) {
      index = index - 1
    }
  }

  return output
}

function generateNouns(length = 4) {
  const output = []

  for (let index = 0; index < length; index++) {
    const noun = nouns.one()
    if (output.includes(noun)) {
      index = index - 1
    } else {
      const titleCaseWord = `${noun.charAt(0).toUpperCase()}${noun.substr(1).toLowerCase()}`
      output.push(titleCaseWord)
    }
  }

  return output
}

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault()

  const badWordCount = document.querySelector('#badWordCount').value || 0
  const cleanWordCount = document.querySelector('#goodWordCount').value || 0
  const isInsult = document.querySelector('#insult').checked || false

  const badWords = generateBadWords(badWordCount)
  const cleanWords = generateCleanWords(cleanWordCount)

  let output = [
    ...badWords,
    ...cleanWords,
  ]

  if (isInsult) {
    const nounList = generateNouns(1)
    output = shuffleArray(output)
    output.unshift('You')
    output.push(nounList)
  } else {
    output.push(random(100, 999))
    output = shuffleArray(output)
  }

  console.log(output)

  document.querySelector('#generatedWord').value = output.join(' ').trim()
})
