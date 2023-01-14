const input = document.querySelector("#username")
const button = document.querySelector("#button")
const form = document.querySelector('.login-area')

const validateInput = ({ target }) => {
    if(target.value.length >= 2) {
        button.removeAttribute('disabled')
    } else{
        button.setAttribute('disabled', '')
    }
}

const handleSubmit = (event) => {
    event.preventDefault()
    
    localStorage.setItem('player', input.value)
    window.location = '../pages/memory-game.html'
}

input.addEventListener('input', validateInput)
form.addEventListener('submit', handleSubmit)