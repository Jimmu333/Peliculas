// Define la URL de la API de TMDb y tu API Key
const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '9bd00ed1f0407e78926156c245b5d963';

// Elementos HTML
const genreSelect = document.getElementById('genreSelect');
const movieList = document.getElementById('movieList');
const movieDetails = document.getElementById('movieDetails');

// Función para cargar los géneros desde la API
function loadGenres() {
    // Realiza una solicitud GET a la API de géneros
    fetch(`${apiUrl}/genre/movie/list?language=es&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Llena el select con las opciones de género
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

// Función para cargar películas populares basadas en el género seleccionado
function loadMoviesByGenre(genreId) {
    // Limpiar la lista de películas
    movieList.innerHTML = '';

    // Realiza una solicitud GET a la API de películas populares
    fetch(`${apiUrl}/movie/popular?language=es&with_genres=${genreId}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Llena la lista de películas
            data.results.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.className = 'movie';
                movieElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                `;
                movieElement.addEventListener('click', () => showMovieDetails(movie));
                movieList.appendChild(movieElement);
            });
        })
        .catch(error => console.error(error));
}

// Función para mostrar los detalles de una película
function showMovieDetails(movie) {
    movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
    `;
}

// Event listener para cambios en el select de género
genreSelect.addEventListener('change', () => {
    const selectedGenre = genreSelect.value;
    if (selectedGenre) {
        loadMoviesByGenre(selectedGenre);
    }
});

// Inicializar la página cargando los géneros disponibles
loadGenres();
