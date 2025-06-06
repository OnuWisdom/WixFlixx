const global = {
	currentPage: window.location.pathname,
};

async function displayPopularMovies() {
	const { results } = await fetchApiData('movie/popular');
	results.forEach((movie) => {
		const movieCard = document.createElement('div');
		movieCard.classList.add('card');
		movieCard.innerHTML = `
					<a href="movie-details.html?id=${movie.id} ">

						${
							movie.poster_path
								? `<img
							src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
							class="card-img-top"
							alt="${movie.title}" />`
								: `<img
							src="images/no-image.jpg" class="card-img-top" 
							alt="${movie.title}" />`
						}
					</a>
					<div class="card-body">
						<h5 class="card-title">${movie.title}</h5>
						<p class="card-text">
							<small class="text-muted">Release:${movie.release_date} </small>
						</p>
					</div>
		`;
		document.querySelector('#popular-movies').appendChild(movieCard);
	});
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
	const API_KEY = '78e8755edca9e4310b6148170aed5c4f';
	const API_URL = 'https://api.themoviedb.org/3/';

	const res = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);
	const data = await res.json();
	return data;
}

// Highlight Active Links
function highlightActiveLinks() {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
}

// Initializing the page
function Init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			// Home page initialization
			displayPopularMovies();
			break;
		case '/shows.html':
			console.log('Shows Page');
			break;
		case '/movie-details.html':
			console.log('Movies Page');
			break;
		case '/tv-details.html':
			console.log('TV Shows Page');
			break;
		case '/search.html':
			console.log('Search Page');
			break;
		default:
			break;
	}

	highlightActiveLinks();
}

document.addEventListener('DOMContentLoaded', function () {
	Init();
});
