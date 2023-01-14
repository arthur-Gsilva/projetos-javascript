//pokemon Info
const pokemonNome = document.querySelector('.pokemon-name')
const pokemonId = document.querySelector('.pokemon-id')
const pokemonImage = document.querySelector('#pokemon-image')

let searchpokemon = 1;

//form Info
const form = document.querySelector("#form")
const input = document.querySelector("#search-pokemon")

//buttons
const prev = document.querySelector('#btn-prev')
const next = document.querySelector('#btn-next')

//pokemon Data

const dataPokemon = async (pokemon) => {
    const fetchPokemon =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(fetchPokemon.status === 200){
        const data = await fetchPokemon.json();
        return data;
    }
    
}

//render pokemon
const renderPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'carregando...'
    pokemonId.innerHTML = ''
    pokemonImage.style.display = 'none'

    const data = await dataPokemon(pokemon);

    if(data){
        pokemonNome.innerHTML = data.name;
        pokemonId.innerHTML = `${data.id} -`;
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 

        searchpokemon = data.id
    } 
    else{
        pokemonNome.innerHTML = 'Not Found :C'
    }

    input.value = ''
    
}

//form area
form.addEventListener('submit', (event) => {
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())
})

//buttons
prev.addEventListener('click', () => {
    if(searchpokemon > 1){
        searchpokemon -= 1
    }
    renderPokemon(searchpokemon)
})

next.addEventListener('click', () => {
    searchpokemon += 1
    renderPokemon(searchpokemon)
})

renderPokemon(searchpokemon)