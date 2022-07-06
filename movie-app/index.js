const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&apikey=&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGBASEPATH = "https://image.tmdb.org/t/p/w1280";

async function getMovies() {
  const resp = await fetch(APIURL);
  const data = await resp.json();

  data.results.forEach((movie) => {
  });

  console.log(data);
  return data;
}

getMovies();
