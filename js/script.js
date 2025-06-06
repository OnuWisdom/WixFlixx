const global = {
	currentPage: window.location.pathname,
};

async function displayPopularMovies() {
	const results = await fetchApiData('movie/popular');
	console.log(results);
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
