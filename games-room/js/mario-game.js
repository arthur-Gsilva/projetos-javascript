const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const retry  = document.querySelector(".retry")
const button = document.querySelector('button')

// audios
const backgroundAudio = document.querySelector('#background-audio')
const gameOverAudio = document.querySelector('#game-over-audio')
const jumpAudio = document.querySelector('#jump-audio')


const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)

    jumpAudio.currentTime = 0
    jumpAudio.play()
    
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft
    const cloudsPosition = clouds.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    let width = document.documentElement.clientWidth
    let pipeMargin = 0

    if(width > 800){
        pipeMargin = 120
    } else if(width < 800 && width > 500){
        pipeMargin = 80
    } else if(width < 500){
        pipeMargin = 50
    }
    
    if(pipePosition <= pipeMargin  && pipePosition > 0 && marioPosition < 90){

        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`

        clouds.style.animation = 'none'
        clouds.style.left = `${cloudsPosition}px`

        mario.src = "../assets/images/mario-images/game-over.png"

        if(width > 800){
            mario.style.width = '70px'
            mario.style.marginLeft = '50px'
        } else if(width < 800 && width > 500){
            mario.style.width = '50px'
            mario.style.marginLeft = '30px'
        } else if(width < 500){
            mario.style.width = '40px'
            mario.style.marginLeft = '10px'
        }
        

        


        backgroundAudio.pause()
        gameOverAudio.play()

        setInterval(() => {
            gameOverAudio.muted = true
            retry.style.display = 'block'
        }, 1000)
        

        clearInterval()
    }

    

},10)

const restart = () => {
    location.reload()
}

document.addEventListener('keydown', jump)
window.addEventListener('click', jump)
button.addEventListener('click', restart)

backgroundAudio.play()