const themeSwitch = document.getElementById("theme-switch");
const searchForm = document.getElementById("search-form");
const homeMovieList = document.querySelector(".home .page .movie-list");
const homePage = document.querySelector(".container > .home");
const watchlistPage = document.querySelector(".container > .watchlist");

const apiKey = "623b1853";

let theme = localStorage.getItem("theme") || "light";
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function setTheme(theme) {
    localStorage.setItem("theme", theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
}

function getVisiableMovieList() {
    const movieLists = document.querySelectorAll(".movie-list");

    return Array.from(movieLists).find((list) => {
        let element = list;
        while (element) {
            if (element.classList.contains("hidden")) {
                return false;
            }
            element = element.parentElement;
        }
        return true;
    });
}

function renderStartExploring() {
    homeMovieList.innerHTML = `
        <div class="start-exploring">
            <i class="material-icons">local_movies</i>
            <p>Start exploring</p>
        </div>
    `;
}

function renderUnableToFind() {
    homeMovieList.innerHTML = `
        <p class="unable-to-find">Unable to find what you’re looking for. Please try another search.</p>
    `;
}

function getAddWatchlistIconText(imdbID) {
    return watchlist.some((it) => it.imdbID === imdbID)
        ? "remove_circle_outline"
        : "add_circle_outline";
}

function renderMovieCard(data) {
    const movieList = getVisiableMovieList();
    const iconText = getAddWatchlistIconText(data.imdbID);

    movieList.innerHTML += `
        <div class="movie-card">
            <img src="${data.Poster}" alt="${data.Title}" />
            <div class="movie-card-text-container">
                <div class="title-line">
                    <h2>${data.Title}</h2>
                    <i class="material-icons">star</i>
                    <span>${data.imdbRating}</span>
                </div>
                <div class="action-line">
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <div class="watchlist-button">
                        <button 
                         class="watchlist-add-button"
                         data-imdbid="${data.imdbID}"
                        >
                            <i class="material-icons">${iconText}</i>
                        </button>
                        Watchlist
                    </div>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
        </div>
    `;
}

function renderSearchResults(data) {
    data.Search.forEach((it) => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${it.imdbID}`)
            .then((res) => res.json())
            .then((data) => {
                renderMovieCard(data);
            });
    });
}

function renderRemainingPages(searchTerm, data) {
    const pages = Math.ceil(data.totalResults / 10);

    Array.from({ length: pages - 1 }, (_, i) =>
        fetch(
            `https://www.omdbapi.com/?` +
                `apikey=${apiKey}&s=${searchTerm}&page=${i + 2}`
        )
            .then((res) => res.json())
            .then((data) => {
                renderSearchResults(data);
            })
    );
}

function renderWatchlist() {
    watchlist.forEach((it) => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${it.imdbID}`)
            .then((res) => res.json())
            .then((data) => {
                renderMovieCard(data);
            });
    });
}

setTheme(theme);
renderStartExploring();

themeSwitch.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    setTheme(theme);
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchForm.reportValidity();

    const formData = new FormData(searchForm);
    const searchTerm = formData.get("search");

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.totalResults) {
                homeMovieList.innerHTML = "";
                renderSearchResults(data);
                renderRemainingPages(searchTerm, data);
            } else {
                renderUnableToFind();
            }
        });
});

document.addEventListener("click", (event) => {
    const button = event.target.closest(".watchlist-add-button");

    if (button) {
        const imdbID = button.dataset.imdbid;
        const index = watchlist.findIndex((it) => it.imdbID === imdbID);
        if (index === -1) {
            watchlist.push({ imdbID });
        } else {
            watchlist.splice(index, 1);
        }

        button.children[0].textContent = getAddWatchlistIconText(imdbID);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        return;
    }

    const toWatchlistButton = event.target.closest(".to-watchlist-button");
    if (toWatchlistButton) {
        watchlistPage.classList.remove("hidden");
        homePage.classList.add("hidden");
        getVisiableMovieList().innerHTML = "";
        renderWatchlist();
    }

    const toHomeButton = event.target.closest(".to-home-button");
    if (toHomeButton) {
        homePage.classList.remove("hidden");
        watchlistPage.classList.add("hidden");
    }
});
