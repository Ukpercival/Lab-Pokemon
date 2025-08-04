// Variable global para almacenar los datos del Pokémon consultado actualmente
let pokemonActual = null;

function searchPokemon() {
  const nombre = document.getElementById("nombre").value.toLowerCase().trim();
  if (!nombre) {
    alert("Por favor ingresa un nombre.");
    return;
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }
      return response.json();
    })
    .then(function (data) {
      pokemonActual = {
        name: data.name,
        image: data.sprites.front_default
      };
      //Actualiza la card con los datos del Pokémon
      const card = document.querySelector(".card");
      const imagen = card.querySelector("img");
      const titulo = card.querySelector(".card-title");
      const descripcion = card.querySelector(".card-text");
      imagen.src = pokemonActual.image;
      imagen.alt = pokemonActual.name;
      titulo.textContent = "Pokémon: " + pokemonActual.name.toUpperCase();
      descripcion.textContent = "Este es " + pokemonActual.name.toUpperCase();
    })
    .catch(function (error) {
      alert("¡Error! Pokémon no encontrado");
      // Limpiar la card en caso de error
      const card = document.querySelector(".card");
      const imagen = card.querySelector("img");
      const titulo = card.querySelector(".card-title");
      const descripcion = card.querySelector(".card-text");
      imagen.src = "";
      imagen.alt = "";
      titulo.textContent = "Pokémon:";
      descripcion.textContent = "Descripción:";
      pokemonActual = null;
    });
}
