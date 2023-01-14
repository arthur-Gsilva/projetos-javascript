const form = document.querySelector(".form")
const input = document.querySelector("#search-city")
const body = document.querySelector('body')
const cities = document.querySelectorAll(".cities-options div")

const fetchWeather = async (city) => {
    const APIResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=cb390709d2b91e8d299d9fab2073907f`)

    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data;
    }
}

const renderInfo = async (city) => {

    document.querySelector('.cities-area-container').style.display = 'none'
    document.querySelector('.weather-area').style.display = 'none'
    document.querySelector('#spinner').style.display = 'block'

    const data = await fetchWeather(city)

    if(data){
        document.querySelector('.cities-area-container').style.display = 'block'
        document.querySelector('.weather-area').style.display = 'block'
        document.querySelector('#spinner').style.display = 'none'

        document.getElementById('degress').innerHTML = data.main.temp.toFixed() + '°'
        document.getElementById('title-city').innerHTML = `${data.name}, ${data.sys.country}`
        document.querySelector('.cloud-info p').innerHTML = data.weather[0].description

        //image
        document.querySelector('.cloud-info img').setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)

        // Clouds, damp and wind
        document.querySelector('#clouds').innerHTML = data.clouds.all + '%'
        document.querySelector('#damp').innerHTML = data.main.humidity + '%'
        document.querySelector('#wind').innerHTML = data.wind.speed + 'km/h'

        document.getElementById('city-info--day').innerHTML = 
        `
        Max. ${data.main.temp_max.toFixed()}°F - Min. ${data.main.temp_min.toFixed()}°F
        `

        console.log(data)

        // change background

        let timeOfDay = "day"

        const letterIcon = data.weather[0].icon.substring(2)
        const weatherId = data.weather[0].id
    
        if(letterIcon == "n"){
            timeOfDay = "night"
        }

        if(weatherId === '800'){
            body.style.backgroundImage = (`url(./img/${timeOfDay}/clear.jpg)`)
        }
        else if(weatherId >= '801' && weatherId <= 804){
            body.style.backgroundImage = (`url(./img/${timeOfDay}/cloudy.jpg)`)
        }
        else if(weatherId >= 600 && weatherId <= 622){
            body.style.backgroundImage = (`url(./img/${timeOfDay}/snowy.jpg)`)
        }
        else{
            body.style.backgroundImage = (`url(./img/${timeOfDay}/rainy.jpg)`)
        }





    } else{
        alert('Cidade não localizada, Por favor insira uma informação válida')
        document.querySelector('.cities-area-container').style.display = 'block'
        document.querySelector('.weather-area').style.display = 'block'
        document.querySelector('#spinner').style.display = 'none'
    }

}

renderInfo('Recife')

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        input.value = e.target.innerHTML

        renderInfo(input.value)
        input.value = ''
    })
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    renderInfo(input.value)

    input.value = ''
})