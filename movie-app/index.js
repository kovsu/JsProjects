const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGBASEPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPIURL =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const container = document.querySelector(".movie__container");
const input__val = document.querySelector(".movie__input");
const home = document.querySelector(".movie__home");

function renderMovie(title, vote_average, overview, poster_path) {
  const div = document.createElement("div");
  div.classList.add("movie__item");
  div.innerHTML = `
    <div class="movie__cover">
      <img
        src="${IMGBASEPATH + poster_path}"
        alt="${title}"
      />
    </div>
    <div class="movie__info">
      <p class="movie__name">${title}</p>
      <span class="movie__rate ${
        vote_average >= 8 ? "great" : vote_average >= 6 ? "good" : "bad"
      }">${vote_average}</span>
    </div>
    <div class="movie__details">
      <h3>Overview</h3>
      <p>${overview}</p>
    </div>
  `;

  container.appendChild(div);
}

async function getMovies() {
  const resp = await fetch(APIURL);
  const data = await resp.json();
  container.innerHTML = "";

  data.results.forEach((movie) => {
    const { title, vote_average, overview, poster_path } = movie;
    renderMovie(title, vote_average, overview, poster_path);
  });

  // console.log(data);
  return data;
}

async function getSearchResults(keyword) {
  let resp = await fetch(SEARCHAPIURL + keyword);
  let data = await resp.json();
  console.log(data);

  data.results.forEach((movie) => {
    const { title, vote_average, overview, poster_path } = movie;
    renderMovie(title, vote_average, overview, poster_path);
  });
}

getMovies();

input__val.onkeydown = (e) => {
  if (e.keyCode === 13 && input__val.value) {
    container.innerHTML = "";
    getSearchResults(input__val.value);
    console.log(input__val.value);
  }
};

home.addEventListener("click", () => {
  getMovies();
});
