const fs = require("fs");

let funciones = {
    leer: (path) => {
        let archivoJSON = fs.readFileSync(path,"utf-8");
        return JSON.parse(archivoJSON);
    },
}

module.exports = funciones;