// Variable global para almacenar los datos del Pokémon consultado actualmente
let pokemonActual = null;

/**
 * Busca un Pokémon en la PokeAPI usando async/await y muestra su información.
 */
async function searchPokemon() {
    const pokemonNameInput = document.getElementById('nombre');
    const pokemonName = pokemonNameInput.value.toLowerCase().trim();

    // Referencias a los elementos de la tarjeta
    const pokemonCard = document.getElementById('pokemonCard');
    const pokemonImage = document.getElementById('pokemonImage');
    const pokemonNameEl = document.getElementById('pokemonName');
    const pokemonDescriptionEl = document.getElementById('pokemonDescription');

    if (!pokemonName) {
        alert('Por favor, ingresa el nombre de un Pokémon.');
        return;
    }

    try {
        // Ocultar la tarjeta mientras se realiza la búsqueda
        pokemonCard.style.display = 'none';

        // 1. Obtener datos principales del Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado. Revisa el nombre e inténtalo de nuevo.');
        }
        const data = await response.json();

        // 2. Obtener la descripción en español desde otro endpoint
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
        let description = descriptionEntry ? descriptionEntry.flavor_text : 'No se encontró descripción en español.';

        // Limpiar el texto de la descripción (reemplaza saltos de línea y otros caracteres)
        description = description.replace(/[\n\f\r]/g, ' ');

        // 3. Guardar los datos en nuestra variable global
        pokemonActual = {
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            description: description
        };

        // 4. Actualizar la tarjeta en el HTML con los datos obtenidos
        pokemonImage.src = pokemonActual.image;
        pokemonImage.alt = `Imagen de ${pokemonActual.name}`;
        pokemonNameEl.textContent = pokemonActual.name.charAt(0).toUpperCase() + pokemonActual.name.slice(1);
        pokemonDescriptionEl.textContent = pokemonActual.description;

        // 5. Mostrar la tarjeta con la información
        pokemonCard.style.display = 'block';
        pokemonNameInput.value = ''; // Limpiar el campo de búsqueda

    } catch (error) {
        alert(error.message);
        pokemonActual = null; // Limpiar la variable si ocurre un error
    }
}

/**
 * Guarda el Pokémon actual en la lista de favoritos en localStorage.
 */
function guardarEnFavoritos() {
    if (!pokemonActual) {
        alert('Primero debes buscar un Pokémon para poder agregarlo a favoritos.');
        return;
    }

    // Obtener favoritos de localStorage o inicializar un array vacío si no existe
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Verificar si el Pokémon ya está en favoritos usando el método .some()
    const yaEsFavorito = favoritos.some(favorito => favorito.name === pokemonActual.name);

    if (yaEsFavorito) {
        alert(`'${pokemonActual.name}' ya está en tu lista de favoritos.`);
    } else {
        // Agregar el nuevo Pokémon al array y guardarlo en localStorage
        favoritos.push(pokemonActual);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert(`'${pokemonActual.name}' ha sido agregado a tus favoritos.`);
    }
}