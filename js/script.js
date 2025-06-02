const global = {
	currentPage: window.location.pathname,
};

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
			console.log('Initializing Home Page');
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
