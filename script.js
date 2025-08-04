const buscador = document.getElementById('nombre');
const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
const nombreBuscar = document.getElementById('inputBuscador').value;
buscador.addEventListener('click', function(){
    fetch(url).then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Datos del Pokémon aquíconsole.log(data);
        aquíconsole.log(data);
    })
    .catch(function(error) {alert("¡Error! Pokémon no encontrado");});

})