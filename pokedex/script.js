const listaPokemons = document.getElementById('pokemons');

const getPokemons = () => {
    const Api = fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
    console.log(Api);
    console.log(listaPokemons);
    Api.then((response) => {
        console.log(response);
        return response.json();
    }).then((pokemons) => {
        console.log(pokemons);
        render(pokemons.results);
    })
}

const render = (pokemons) => {
    pokemons.map((pokemon, index) => {
        listaPokemons.insertAdjacentHTML('beforeend', 
       `<li class="pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${index + 1}.gif">
            <h3>${pokemon.name}</h3>
        </li>`)
    })
}
getPokemons();