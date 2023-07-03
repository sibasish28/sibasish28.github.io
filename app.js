const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const getGenreURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&&with_genres="
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL, 1);

async function getMovies(url, page) {
  const resp = await fetch(url + page);
  const respData = await resp.json();

  console.log(respData);
  showMovies(respData.results, url, page);

}

function showMovies(movies, url, page) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview, genre_ids } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");


    movieEl.innerHTML = `
      <img src="${IMGPATH + poster_path}" alt="${title}"/>

     <div class="movie-info">
         <h3">${title}</h3>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
         
     </div> 

     <div class="overview">

     <a href="https://www.imdb.com/find/?q=${title}"><div class="overview">

     <h2>Overview:</h2>
     ${overview}
     </div></a>
    `;

    main.appendChild(movieEl);
  });
  main.innerHTML += `<div class="footer">
    <a href="#" class="back">‹</a>
    <a href="#" class="next">›</a>
    </div>`
  input.checked = false;
  button.classList.remove("button--highlight");
  document.querySelector(".next").addEventListener("click", () => {
    getMovies(url, page + 1)
  })
  if (page > 1) {
    document.querySelector(".back").addEventListener("click", () => {
      getMovies(url, page - 1)
    })
  }

}
var button = document.getElementById("filter-button");
var container = document.getElementById("filter-container");
var input = document.getElementById("f1");
button.onclick = function (e) {
  e.stopPropagation();
  if (container.classList.contains("filters--active")) {
    container.classList.remove("filters--active");
  } else {
    container.classList.add("filters--active");
  }
};

container.onclick = function (e) {
  e.stopPropagation();
};

window.onclick = function () {
  container.classList.remove("filters--active");
};
var movies;
input.onclick = function () {
  var isChecked = false;
  if (input.checked) {
    isChecked = true;
  }


  if (isChecked) {
    button.classList.add("button--highlight");
    movies = document.querySelectorAll(".movie");
    main.innerHTML = "";
    movies.forEach((movie) => {
      if (movie.querySelector(".green")) main.appendChild(movie);
    });
  } else {
    button.classList.remove("button--highlight");
    movies.forEach((movie) => {
      main.appendChild(movie);
    });
  }
};




function getClassByRate(vote) {
  if (vote >= 7.5) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red';
  }

}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {

    getMovies(SEARCHAPI + searchTerm + "&page=", 1);

    search.value = "";
  }
});

document.querySelector("#act").addEventListener("click", () => {
  getMovies(getGenreURL + "28&page=", 1);
})
document.querySelector("#dra").addEventListener("click", () => {
  getMovies(getGenreURL + "18&page=", 1);
})
document.querySelector("#ani").addEventListener("click", () => {
  getMovies(getGenreURL + "16&page=", 1);
})
document.querySelector("#hor").addEventListener("click", () => {
  getMovies(getGenreURL + "27&page=", 1);
})
document.querySelector("#rom").addEventListener("click", () => {
  getMovies(getGenreURL + "10749&page=", 1);
})

document.getElementById("home").addEventListener("click", () => {
  getMovies(APIURL, 1);
  input.checked = false;
  button.classList.remove("button--highlight");

}); 
