const form = document.querySelector('.form')

// inputs
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('password-two')


const errorValidation = (input, message) => {
    const formControl = input.parentElement
    const errorMessage = formControl.querySelector('.error-message')

    errorMessage.innerHTML = message

    formControl.classList.add('error') 
}

const successValidation = (input) => {
    const formControl = input.parentElement

    formControl.classList.add('success') 
}

const checkInputs = () => {
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const confirmPasswordValue = confirmPassword.value.trim()

    if(usernameValue === ''){
        errorValidation(username, "Preencha esse campo")
    } else{
        successValidation(username)
    }

    if(emailValue === ''){
        errorValidation(email, "Preencha esse campo")
    } else{
        successValidation(email)
    }

    if(passwordValue === ''){
        errorValidation(password, "Preencha esse campo")
    } else if(passwordValue.length < 8){
        errorValidation(password, "A senha deve ter 8 ou mais caracteres")
    } else{
        successValidation(password)
    }

    if(confirmPasswordValue === ""){
        errorValidation(confirmPassword, "Preencha esse campo")
    } else if(confirmPasswordValue !== passwordValue){
        errorValidation(confirmPassword, "As senhas não são as mesmas")
    } else {
        successValidation(password)
    }
}

const validateForm = (event) => {
    event.preventDefault()

    checkInputs()
}

form.addEventListener('submit', validateForm)