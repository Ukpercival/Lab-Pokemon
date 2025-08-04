document.addEventListener('DOMContentLoaded', () => {
    const favoritosContainer = document.getElementById('favoritos-container');

    /**
     * Carga los Pokémon desde localStorage y los muestra en la página.
     */
    function mostrarFavoritos() {
        // 1. Obtener favoritos de localStorage o inicializar un array vacío
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        
        // Limpiar el contenedor para evitar duplicados al re-renderizar
        favoritosContainer.innerHTML = '';

        // 2. Verificar si hay favoritos para mostrar
        if (favoritos.length === 0) {
            favoritosContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="fs-4">Aún no tienes Pokémon favoritos.</p>
                    <a href="index.html" class="btn boton btn-primary">¡Busca tu primer favorito!</a>
                </div>
            `;
            return; // Salimos de la función si no hay nada que mostrar
        }

        // 3. Crear y mostrar una tarjeta por cada Pokémon favorito
        favoritos.forEach(pokemon => {
            const cardHTML = `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card h-100 shadow-sm">
                        <img src="${pokemon.image}" class="card-img-top p-3" alt="Imagen de ${pokemon.name}">
                        <div class="card-body text-center d-flex flex-column">
                            <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                            <button class="btn btn-danger btn-sm mt-auto btn-eliminar" data-name="${pokemon.name}">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            favoritosContainer.innerHTML += cardHTML;
        });
    }

    /**
     * Elimina un Pokémon de la lista de favoritos en localStorage.
     * @param {string} nombrePokemon - El nombre del Pokémon a eliminar.
     */
    function eliminarFavorito(nombrePokemon) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos = favoritos.filter(pokemon => pokemon.name !== nombrePokemon);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        mostrarFavoritos(); // Volver a renderizar la lista actualizada
    }

    // Delegación de eventos para los botones de eliminar
    favoritosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-eliminar')) {
            const nombre = event.target.dataset.name;
            eliminarFavorito(nombre);
        }
    });

    // Carga inicial de los favoritos al entrar en la página
    mostrarFavoritos();
});