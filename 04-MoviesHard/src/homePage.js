const funciones = require("../customFunctions");

let moviesTotal = funciones.leer("./data/movies.json");
let movies = moviesTotal.movies;
let cantMovies = moviesTotal.total_movies;

let tituloHome = "Bienvenidos a DH Movies, el mejor sitio para encontrar las mejores películas, incluso mucho mejor que Netflix, Cuevana y PopCorn";
let pelisOrdenadas = movies.map(pelicula => pelicula.title);
pelisOrdenadas.sort();
let pelisOrdenadasString = pelisOrdenadas.reduce((acum, actual) => `${acum}\n${actual}`);
let pieDePagina = "Recordá que podés visitar las secciones:\n\nEn Cartelera\nMás votadas\nSucursales\nContacto\nPreguntas frecuentes";
module.exports = `${tituloHome}\n\n\nTotal de películas en cartelera: ${cantMovies}\n\n\n${pelisOrdenadasString}\n\n\n${pieDePagina}`;