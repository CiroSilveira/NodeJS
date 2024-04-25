const listaPokemons = document.getElementById('pokemons');

const getPokemons = async (name = '') => {
    if(name !== '') {
        // Recebe o status da req ex: chegou na cozinha
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); //{Linhas do código com o THEN 1}
        console.log(response);
        // Recebe o response em json {"key": value}
        const data = await response.json(); //{Linhas do código com o THEN 2,3,4}
        console.log(data);
        // Transforma o json em array para possibilitar a iteração com o método MAP()
        // const pokemons = [data]; //{Linhas do código com o THEN 5,6,7,8}
        // console.log(pokemons);
        
        renderOne(data); //{Linhas do código com o THEN 9}

        // const Api = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        // Api.then((response) => {
        //     console.log(response);
        //     return response.json();
        // }).then((pokemons) => {
        //     const poke = [pokemons];
        //     console.log(pokemons);
        //     console.log(poke);
        //     render(poke);
        // })
    } else {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=120');
        console.log(response);
        const data = await response.json();
        console.log(data);
        renderAll(data.results);
    }
}

const renderOne = (pokemon) => {
    listaPokemons.innerHTML = '';
    listaPokemons.insertAdjacentHTML('beforeend', 
        `<li class="pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif">
            <h3>${pokemon.name}</h3>
            <h4>Peso: ${pokemon.weight}</h4>
            <p>Tipo:
            ${pokemon.types.map(el => 
                el.type.name
            ).join('/')}</p>
        </li>`)
}

const renderAll = (pokemons) => {
    listaPokemons.innerHTML = '';
    pokemons.map((pokemon, index) => {
        listaPokemons.insertAdjacentHTML('beforeend', 
       `<li class="pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${index + 1}.gif">
            <h3>${pokemon.name}</h3>
        </li>`)
    })
}


const searchPokemon = (event) => {
    event.preventDefault();
    const name = document.getElementById('inome').value;
    getPokemons(name);
}

getPokemons();