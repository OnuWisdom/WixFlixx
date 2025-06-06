const global = {
	currentPage: window.location.pathname,
};

// Function to display popular movies on the home page
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
							<small class="text-muted">Release: ${movie.release_date} </small>
						</p>
					</div>
		`;
		document.querySelector('#popular-movies').appendChild(movieCard);
	});
}

// Function to display popular TV shows on the home page
async function displayPopularShow() {
	const { results } = await fetchApiData('tv/popular');
	results.forEach((show) => {
		const showsCard = document.createElement('div');
		showsCard.classList.add('card');
		showsCard.innerHTML = `
					<a href="tv-details.html?id=${show.id} ">

						${
							show.poster_path
								? `<img
							src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
							class="card-img-top"
							alt="${show.name}" />`
								: `<img
							src="images/no-image.jpg" class="card-img-top" 
							alt="${show.name}" />`
						}
					</a>
					<div class="card-body">
						<h5 class="card-title">${show.name}</h5>
						<p class="card-text">
							<small class="text-muted">Air Date: ${show.first_air_date} </small>
						</p>
					</div>
		`;
		document.querySelector('#popular-shows').appendChild(showsCard);
	});
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
	const API_KEY = '78e8755edca9e4310b6148170aed5c4f';
	const API_URL = 'https://api.themoviedb.org/3/';

	showSpinner();

	const res = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);
	const data = await res.json();

	hideSpinner();
	return data;
}

// Function to show spinner
function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
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
			displayPopularShow();
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
