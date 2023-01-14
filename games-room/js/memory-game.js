const grid = document.querySelector('.grid')
const player = document.querySelectorAll('.player')
const timer = document.querySelector(".timer")

const header = document.querySelector('header')
const square = document.querySelector(".square-victory")
const score = document.querySelector(".score")

const button = document.querySelector('#button')

const audio = document.querySelector("#audio")

let firstCard = ''
let secondCard = ''

const characters = [
    'levi',
    'eren',
    'mikasa',
    'bertholdt',
    'reiner',
    'sasha',
    'hange',
    'erwin',
    'armin',
    'zeke'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')

    if(disabledCards.length === (characters.length * 2)){
        clearInterval(this.loop)
        grid.style.display = 'none'
        header.style.display = 'none'
        square.style.display = 'flex'
        score.innerHTML = timer.innerHTML
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if(firstCharacter === secondCharacter){

        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ""
        secondCard = ""

        checkEndGame()

    } else{

        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ""
            secondCard = ""
        }, 500)
        
        
    }
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')){
        return
    }

    if(firstCard === ''){

        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode

    } else if (secondCard === ''){

        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards()
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../assets/images/memory-images/${character}.jpg')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    grid.appendChild(card)

    

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters]

    const suffleArray = duplicateCharacters.sort(() => Math.random() - .5)


    suffleArray.forEach((character) => {
        createCard(character)
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTimer = timer.innerHTML
        timer.innerHTML = +currentTimer + 1
    }, 1000)
}

button.addEventListener('click', () => {
    location.reload()
})

window.onload = () => {

    for(let i in player){
        player[i].innerHTML = localStorage.getItem('player')
    }

    audio.play()
    startTimer()
    loadGame()
}