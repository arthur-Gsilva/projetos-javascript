const button = document.querySelector('#button')

let levels = [
    {classification: `, Você está abaixo do Peso ideal`, imc: [0, 18.5]},
    {classification: ', Você está no peso ideal, Parabéns !!!', imc: [18.6, 24.9]},
    {classification: ', Você está acima do peso ideal', imc: [25, 30]},
    {classification: ', Você está com obesidade, cuidado!!!', imc: [30.1, 99999999]}
]

const calculateIMC = (height, weight) => {
    const result = document.querySelector('.resultado')
    const name = document.querySelector('#nome').value
    
    const imc = weight / (height * height)

    for(let i in levels){
        if(imc >= levels[i].imc[0] && imc < levels[i].imc[1]){
            console.log(levels[i])
            result.innerHTML = `${name}${levels[i].classification} e seu imc é ${imc.toFixed(1)}`
        }
    }
}

const executeCalc = () => {
    let height = document.querySelector('#altura').value
    let weight = document.querySelector('#peso').value
    let name = document.querySelector('#nome').value

    if(height === '' || weight === '' || name === ''){
        alert('preencha todos os campos')
    } else{
        calculateIMC(height, weight)

        document.querySelector('#altura').value = ''
        document.querySelector('#peso').value = ''
        document.querySelector('#nome').value = ''
    }
}

button.addEventListener('click', executeCalc)