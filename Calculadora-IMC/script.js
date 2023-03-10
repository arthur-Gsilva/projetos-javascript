const button = document.querySelector('#button')


const height = document.querySelector('#altura').value
const weight = document.querySelector('#peso').value
const result = document.querySelector('.resultado')

let levels = [
    {classifications: `, Você está abaixo do Peso ideal`, imc: [0, 18.5]}
]

const calculateIMC = () => {
    const name = document.querySelector('#nome').value
    console.log(name)
}


button.addEventListener('click', calculateIMC)