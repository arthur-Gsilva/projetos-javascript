let songs = [
    {title: "Guren no Yumiya", artist: "Linked Horizon", src: 'songs/opening-1.mp3', img: "images/opening-1.jpg"},
    {title: "Jiyuu no Tsubasa", artist: "Linked Horizon", src: 'songs/opening-2.mp3', img: "images/opening-2.jpg"},
    {title: "Shinzou wo Sasageyo", artist: "Linked Horizon", src: 'songs/opening-3.mp3', img: "images/opening-3.jpg"},
    {title: "Red Swan", artist: "Yoshiki Hayashi", src: 'songs/opening-4.mp3', img: "images/opening-4.jpg"},
    {title: "Shoukei to Shikabane no Michi", artist: "Linked Horizon", src: 'songs/opening-5.mp3', img: "images/opening-5.jpg"},
    {title: "Boku no Sensou", artist: "Shinsei Kamattechan", src: 'songs/opening-6.mp3', img: "images/opening-6.jpg"},
    {title: "The Rumbling", artist: "SiM", src: 'songs/opening-7.mp3', img: "images/opening-7.jpg"}
]

let indexSong = 0


// song
const song = document.querySelector('audio')
let bar = document.querySelector('progress')

// buttons
const pauseButton = document.querySelector('.button-pause')
const playButton = document.querySelector('.button-play')

// Song Info
const songName = document.querySelector('.song-name')
const artist = document.querySelector('.artist')
const image = document.querySelector('img')

// End song
let songDuration = document.querySelector('.end-time')



const playSound = () => {
    song.play()
    playButton.style.display = "none"
    pauseButton.style.display = "block"
}

const pauseSound = () => {
    song.pause()
    pauseButton.style.display = "none"
    playButton.style.display = "block"
}

const renderMusic = (index) => {
    song.setAttribute('src', songs[index].src)
    song.addEventListener('loadeddata', () => {
        songName.innerHTML = songs[index].title
        artist.innerHTML = songs[index].artist
        image.setAttribute('src', songs[index].img)
        songDuration.innerHTML = trasformTime(Math.floor(song.duration))
    })
}

const updateBar = () => {

    bar.style.width = Math.floor((song.currentTime / song.duration) * 100) + '%'

    let initialTime = document.querySelector(".initial-time")
    initialTime.innerHTML = trasformTime(Math.floor(song.currentTime))

    if(initialTime.innerHTML == trasformTime(Math.floor(song.duration))){
        initialTime.innerHTML = '0:00'
        bar.style.width = '0'
        pauseSound()
    }
    
}


const trasformTime = (seconds) => {
    let minutesField = Math.floor(seconds / 60)
    let secondsField = seconds % 60
    if(secondsField < 10){
        secondsField = '0' + secondsField
    }

    return `${minutesField}:${secondsField}`
}

playButton.addEventListener('click', playSound)
pauseButton.addEventListener('click', pauseSound)
song.addEventListener('timeupdate', updateBar)

document.querySelector('.next').addEventListener('click', () => {
    indexSong++
    if(indexSong == songs.length){
        indexSong = 0
    }
    renderMusic(indexSong)
    pauseSound()
    bar.style.width = '0'
})

document.querySelector('.previous').addEventListener('click', () => {
    indexSong--
    if(indexSong < 0){
        indexSong = songs.length - 1
    }
    renderMusic(indexSong)
    pauseSound()
    bar.style.width = '0'
})

renderMusic(indexSong)