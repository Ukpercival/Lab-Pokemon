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
<<<<<<< HEAD
=======
// !Funcion guardar favorito

function guardarEnFavoritos() {
  if (!pokemonActual) {
    alert("No hay pokemón, busca un Pokémon.");
    return;
  }

  // verificamos leemos el pokemon 
  let favoritos;
  const datosGuardados = localStorage.getItem("favoritos");

  if (datosGuardados) {
    favoritos = JSON.parse(datosGuardados);
  } else {
    favoritos = [];
  }

  //verificamos si existe
  let yaExiste = false;

  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i].name == pokemonActual.name) {
      yaExiste = true;
      break;
    }
  }

  if (yaExiste) {
    alert("Este Pokémon ya está en favoritos.");
    return;
  }

  // Agregar y guardar
  favoritos.push(pokemonActual);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  alert("¡Pokémon guardado en favoritos!");
}
>>>>>>> 1f1c435372d6f489230a497c3b3fd1bce6d0bb0d
