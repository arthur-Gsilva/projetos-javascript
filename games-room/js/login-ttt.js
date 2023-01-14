const inputs = document.querySelectorAll('.input')
const button = document.querySelector('#button-ttt')
const form = document.querySelector(".login-form")

const inputPlayer1 = document.querySelector("#player1")
const inputPlayer2 = document.querySelector("#player2")

const validateInput = ({ target }) => {
    if(target.value.length >= 2 && inputPlayer2.value !== ''){
        button.removeAttribute('disabled')
        return;
    }

    button.setAttribute('disabled', '')
}

const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem('playerX', inputPlayer1.value)
    localStorage.setItem('playerO', inputPlayer2.value)
    
    window.location = '../pages/tic-tac-toe.html'
}

inputs.forEach(input => {
    input.addEventListener('input', validateInput)
})

form.addEventListener('submit', handleSubmit)