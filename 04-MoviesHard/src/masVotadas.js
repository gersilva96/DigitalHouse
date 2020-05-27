const funciones = require("../customFunctions");

let moviesTotal = funciones.leer("./data/movies.json");
let movies = moviesTotal.movies;

let tituloMasVotadas = "Más Votadas";
let masVotadas = movies.filter(elemento => elemento.vote_average >= 7);
let masVotadasOnly = masVotadas.map(pelicula => pelicula.vote_average);
let promedio = ((masVotadasOnly.reduce((acum, actual) => acum += actual)) / (masVotadasOnly.length)).toFixed(2);
let listado = "";
movies.forEach(elemento => listado += `${elemento.title}\nRating: ${elemento.vote_average}\n${elemento.overview}\n\n`);
module.exports = `${tituloMasVotadas}\n\n\nTotal de películas más votadas: ${masVotadasOnly.length}\n\n\nRating promedio: ${promedio}\n\n\n${listado}`;