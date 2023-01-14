const button = document.querySelector('#button')

function imc(){

    const name = document.querySelector('#nome').value
    const height = document.querySelector('#altura').value
    const weight = document.querySelector('#peso').value
    const result = document.querySelector('.resultado')

    
    if(name !== '' && height !== '' && weight !== ''){

        const imcValue = (weight / (height * height)).slice(3)
        let classification = ''
        

        if(imcValue < 18.5){
            classification = 'abaixo do peso'
        } else if (imcValue < 25){
            classification = 'com o peso ideal. Parabéns!!!'
        } else if (imcValue < 30){
            classification =  'levemente acima do peso'
        } else if (imcValue < 35){
            classification = 'com obesidade grau I'
        } else if (imcValue < 40){
            classification = 'com obesidade grau II'
        } else {
            classification = 'com obesidade grau III'
        }

        result.innerHTML = `Olá ${name}, seu IMC é de ${imcValue} e você está ${classification}`
    } else {
        result.innerHTML = 'Preencha todos os campos!!!'
    }


}

button.addEventListener('click', imc)