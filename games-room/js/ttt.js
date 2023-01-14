const playerX = document.querySelector('#playerX')
const playerO = document.querySelector('#playerY')

let counterX = 0
let counterY = 0
let pointsX = document.querySelector('#points-player1')
let pointsY = document.querySelector('#points-player2')

pointsX.innerHTML = counterX
pointsY.innerHTML = counterY

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let player = ''

const reset = () => {
    let random = Math.floor(Math.random() * 2)

    player = (random === 0) ? "X" : "O"

    for(let i in square){
        square[i] = ""
    }

    renderSquare()
    renderInfo()
}

const renderSquare = () => {
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]
    }

    checkGame()
}

const renderInfo = () => {
    document.querySelector('#player').innerHTML = player
}

const togglePlayer = () => {
    player = (player === "X") ? "O" : "X"
    renderInfo()
}

const itemClick = (event) => {
    let item = event.target.getAttribute('data-item')
    if(square[item] === ""){
        square[item] = player
        renderSquare()
        togglePlayer()
    }
}

const checkWinnerFor = (player) => {
    let possibilites = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let w in possibilites){
        let pArray = possibilites[w].split(',')

        let hasWon = pArray.every(option => square[option] === player)
        if(hasWon){
            return true
        }
    }

    return false;
}

const checkGame = () => {

    if(checkWinnerFor('X')){
        alert('Player X Won')
        counterX++
        pointsX.innerHTML = counterX
        reset()
    } else if(checkWinnerFor('O')){
        alert('Player O Won')
        counterY++
        pointsY.innerHTML = counterY
        reset()
    } else if(isFull()){
        alert("Draw :/")
        reset()
    }
}

const isFull = () => {
    for(let i in square){
        if(square[i] === ''){
            return false
        }
    }
    return true;
}

let boxes = document.querySelectorAll(".box")
boxes.forEach(box => {
    box.addEventListener('click', itemClick)
})

window.onload = () => {
    playerX.innerHTML = localStorage.getItem('playerX')
    playerO.innerHTML = localStorage.getItem('playerO')

    reset()
}