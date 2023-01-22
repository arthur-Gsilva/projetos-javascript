let currentQuestion = 0
let correctAnswer = 0


let audio = document.querySelector('audio')
audio.play()



document.querySelector('#button').addEventListener('click', () => {
    location.reload()
})


const OptionClickEvent = (e) => {
    const clickedOption = +e.target.getAttribute('data-op')
    const clickedOptionBox = e.target

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswer++
        clickedOptionBox.style.backgroundColor = 'green'
    } else{
        clickedOptionBox.style.backgroundColor = 'red'
    }

    setTimeout(() => {
        currentQuestion++
        showQuestion()
    }, 500) 
}

const progressBar = () => {
    let pct = Math.floor((currentQuestion / questions.length) * 100)

    document.querySelector('.progress-bar').style.width = `${pct}%`
}

const validationCheck = (points) => {
    let scoreTitle = document.querySelector('.score-area .title')
    let classification = document.querySelector('.classification')

    if(points < 30){
        scoreTitle.innerHTML = 'It was bad, needs to improve.'
        classification.style.color = "#ff0000"
    } else if(points >= 30 && points < 70){
        scoreTitle.innerHTML = 'It was good.'
        classification.style.color = "#ffff00"
    } else if(points >= 70){
        scoreTitle.innerHTML = 'You were excellent!!!'
        classification.style.color = "rgb(15, 201, 15)"
    }
}

const finishQuiz = () => {

    let player = document.getElementById('player').innerHTML = localStorage.getItem('player')

    let points = Math.floor((correctAnswer / questions.length) * 100)
    document.getElementById('pct').innerHTML = `${points}%`
    document.querySelector('.score-description').innerHTML = `
        ${player}, Your score was ${correctAnswer}/${questions.length}
    `

    
    validationCheck(points)

    document.querySelector('.container').style.display = 'none'
    document.querySelector('.score-area').style.display = 'block'
    document.querySelector('.progress-bar').style.width = `100%`
}

const showQuestion = () => {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]

        document.querySelector('.container').style.display = 'block'
        document.querySelector('.score-area').style.display = 'none'

        document.querySelector('.question').innerHTML = q.question
        

        let optionsHTML = ''
        for(let i in q.options){
            optionsHTML += 
                `<div data-op=${i} class="option"><span>${'0'+(+i + 1)}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHTML

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', OptionClickEvent)
        })

        progressBar()
       
    } else{
        finishQuiz()
    }
}


showQuestion()

window.onload = () => {
    
}