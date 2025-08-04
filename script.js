const buscador = document.getElementById('nombre');
const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
buscador.addEventListener('click', function(){
    fetch(url).then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Datos del Pokémon aquíconsole.log(data);
    })
    .catch(function(error) {alert("¡Error! Pokémon no encontrado");});

})