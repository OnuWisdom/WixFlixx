const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0,
	},
	api: {
		key: '78e8755edca9e4310b6148170aed5c4f',
		url: 'https://api.themoviedb.org/3/',
	},
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

// Display Movie details on the movie details page
async function displayMovieDetails() {
	const movieId = new URLSearchParams(window.location.search).get('id');

	const movie = await fetchApiData(`movie/${movieId}`);
	const div = document.createElement('div');

	// Overlay the movie images
	displayBackgroundImage('movie', movie.backdrop_path);

	div.innerHTML = ` 
	<div class="details-top">
					<div>
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
					</div>
					<div>
						<h2>${movie.title} </h2>
						<p>
							<i class="fas fa-star text-primary"></i>
							${movie.vote_average.toFixed(1)} / 10
						</p>
						<p class="text-muted">Release Date: ${movie.release_date} </p>
						<p>
							${movie.overview}
						</p>
						<h5>Genres</h5>
						<ul class="list-group">
							${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
						</ul>
						<a href="${
							movie.homepage
						} " target="_blank" class="btn">Visit Movie Homepage</a>
					</div>
				</div>
				<div class="details-bottom">
					<h2>Movie Info</h2>
					<ul>
						<li><span class="text-secondary">Budget:</span> $ ${movie.budget}</li>
						<li><span class="text-secondary">Revenue:</span> $ ${movie.revenue}</li>
						<li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes </li>
						<li><span class="text-secondary">Status:</span> ${movie.status}</li>
					</ul>
					<h4>Production Companies</h4>
					<div class="list-group">${movie.production_companies
						.map(
							(company) =>
								`<span class="list-group-item">${company.name}</span>`
						)
						.join('')} </div>
				</div>
	`;

	document.querySelector('#movie-details').appendChild(div);
}

// Display Shows details on the movie details page
async function displayShowDetails() {
	const showId = new URLSearchParams(window.location.search).get('id');
	console.log(showId);

	const show = await fetchApiData(`tv/${showId}`);
	console.log(show);
	const div = document.createElement('div');

	// Overlay the movie images
	displayBackgroundImage('show', show.backdrop_path);

	div.innerHTML = ` 
	<div class="details-top">
					<div>
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
					</div>
					<div>
						<h2>${show.name} </h2>
						<p>
							<i class="fas fa-star text-primary"></i>
							${show.vote_average.toFixed(1)} / 10
						</p>
						<p class="text-muted">Last Air Date: ${show.last_air_date} </p>
						<p>
							${show.overview}
						</p>
						<h5>Genres</h5>
						<ul class="list-group">
							${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
						</ul>
						<a href="${show.homepage} " target="_blank" class="btn">Visit Movie Homepage</a>
					</div>
				</div>
				<div class="details-bottom">
					<h2>Show Info</h2>
					<ul>
						<li><span class="text-secondary">Number of Episodes</span>${
							show.number_of_episodes
						} </li>
						<li><span class="text-secondary">Last Episode to air:</span>  ${
							show.last_episode_to_air.name
						}</li>
						<li><span class="text-secondary">Number of Seasons:</span> ${
							show.number_of_seasons
						} </li>
						<li><span class="text-secondary">Status:</span> ${show.status}</li>
					</ul>
					<h4>Production Companies</h4>
					<div class="list-group">${show.production_companies
						.map(
							(company) =>
								`<span class="list-group-item">${company.name}</span>`
						)
						.join('')} </div>
				</div>
	`;

	document.querySelector('#show-details').appendChild(div);
}

// Function to display background image for movie or TV show details
function displayBackgroundImage(type, backdropPath) {
	const overlayDiv = document.createElement('div');
	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdropPath})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.zIndex = '-1';
	overlayDiv.style.opacity = '0.2';

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv);
	} else {
		document.querySelector('#show-details').appendChild(overlayDiv);
	}
}

// Function to handle search functionality
async function search() {
	const query = new URLSearchParams(window.location.search); //.get('type');
	global.search.type = query.get('type');
	global.search.term = query.get('search-term');

	if (global.search.term !== '' && global.search.term !== null) {
		// Make Search request
		const { results, total_pages, page, total_results } = await searchApiData();

		global.search.page = page;
		global.search.totalPages = total_pages;
		global.search.totalResults = total_results;

		if (results.length === 0) {
			showAlert('No results found', 'error');
			document.querySelector('#search-results').innerHTML = '';
			return;
		}

		displaySearchResults(results);

		document.querySelector('#search-term').value = '';
	} else {
		showAlert('Please enter a search term', 'error');
	}
}

function displaySearchResults(results) {
	const searchResultsContainer = document.querySelector('#search-results');
	searchResultsContainer.innerHTML = '';

	results.forEach((result) => {
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `
			<a href="${global.search.type}-details.html?id=${result.id}">
				${
					result.poster_path
						? `<img src="https://image.tmdb.org/t/p/w500${
								result.poster_path
						  }" class="card-img-top" alt="${
								global.search.type === 'movie' ? result.title : result.name
						  }" />`
						: `<img src="images/no-image.jpg" class="card-img-top" alt="${
								global.search.type === 'movie' ? result.title : result.name
						  }" />`
				}
			</a>
			<div class="card-body">
				<h5 class="card-title">${result.title || result.name}</h5>
				<p class="card-text">
					<small class="text-muted"> Release:
						${global.search.type === 'movie' ? result.release_date : result.first_air_date}
					</small>
				</p>
				
			</div>
		`;

		document.querySelector('#search-results-heading').innerHTML = `
		
			<h2>${results.length} of ${global.search.totalResults} results for ${global.search.term} </h2>
			`;

		searchResultsContainer.appendChild(card);
	});

	displayPagination();
}

// Display Slider for popular movies
async function displaySlider() {
	const { results } = await fetchApiData('movie/now_playing');
	const sliderContainer = document.querySelector('.swiper-wrapper');

	results.forEach((movie) => {
		const slide = document.createElement('div');
		slide.classList.add('swiper-slide');
		slide.innerHTML = `
			<a href="movie-details.html?id=${movie.id}">
				${
					movie.poster_path
						? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />`
						: `<img src="images/no-image.jpg" alt="${movie.title}" />`
				}
			</a>
						<h4 class="swiper-rating">
							<i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
						</h4>
		`;
		sliderContainer.appendChild(slide);

		initSwiper();
	});
}

// Initialize Swiper for the slider
function initSwiper() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		loop: true,
		autoplay: {
			delay: 1000, // Delay between slides
			disableOnInteraction: false, // Continue autoplay after user interaction
		},
		breakpoints: {
			500: {
				slidesPerView: 2, // Show 2 slides on small screens
			},
			700: {
				slidesPerView: 3, // Show 3 slides on medium screens
			},
			1200: {
				slidesPerView: 4, // Show 4 slides on large screens
			},
		},
	});
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
	const API_KEY = global.api.key;
	const API_URL = global.api.url;

	showSpinner();

	const res = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);
	const data = await res.json();

	hideSpinner();
	return data;
}

// Search API data based on the search term and type
async function searchApiData() {
	const API_KEY = global.api.key;
	const API_URL = global.api.url;

	showSpinner();

	const res = await fetch(
		`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
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

// Show Alert Message
function showAlert(message, className) {
	const alertDiv = document.createElement('div');
	alertDiv.classList.add('alert', className);
	alertDiv.appendChild(document.createTextNode(message));

	// Insert alert into the DOM
	document.querySelector('#alert').appendChild(alertDiv);

	// const container = document.querySelector('.container');
	// const header = document.querySelector('.header');
	// container.insertBefore(alertDiv, header);

	// Remove alert after 3 seconds
	setTimeout(() => alertDiv.remove(), 2000);
}

// Initializing the page
function Init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			// Home page initialization
			displaySlider();
			displayPopularMovies();
			break;
		case '/shows.html':
			displayPopularShow();
			break;
		case '/movie-details.html':
			displayMovieDetails();
			break;
		case '/tv-details.html':
			displayShowDetails();
			break;
		case '/search.html':
			search();
			break;
		default:
			break;
	}

	highlightActiveLinks();
}

document.addEventListener('DOMContentLoaded', function () {
	Init();
});
