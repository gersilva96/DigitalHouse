const funciones = require("../customFunctions");

let moviesTotal = funciones.leer("./data/movies.json");
let movies = moviesTotal.movies;
let cantMovies = moviesTotal.total_movies;

let tituloCartelera = "En Cartelera";
let titulosConResenias = "";
movies.forEach(elemento => titulosConResenias += `${elemento.title}\n${elemento.overview}\n\n`);
module.exports = `${tituloCartelera}\n\n\nTotal de películas: ${cantMovies}\n\n\n${titulosConResenias}`;