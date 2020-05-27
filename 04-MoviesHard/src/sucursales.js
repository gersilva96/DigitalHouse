const funciones = require("../customFunctions");

let theatersTotal = funciones.leer("./data/theaters.json");
let theaters = theatersTotal.theaters;
let cantTheaters = theatersTotal.total_theaters;

let tituloSucursales = "Nuestras salas";
let listadoSalas = "";
theaters.forEach(elemento => listadoSalas += `${elemento.name}\n${elemento.address}\n${elemento.description}\n\n`)
module.exports = `${tituloSucursales}\n\n\nTotal de salas: ${cantTheaters}\n\n\n${listadoSalas}`;