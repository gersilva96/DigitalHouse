const fs = require("fs");

let funciones = {
    nombre: "tareas.json",
    leer: function(){
        let leer = fs.readFileSync(this.nombre,"utf-8");
        return JSON.parse(leer);
    },
    escribirJSON: arrayDeTareas => JSON.stringify(arrayDeTareas),
    guardarTarea: function(arrayDeTareas){
        return fs.writeFileSync(this.nombre,this.escribirJSON(arrayDeTareas));
    },
    filtrarPorEstado: function(estadoAFiltrar){
        let arrayDeTareas = this.leer();
        return arrayDeTareas.filter(tarea => tarea.estado===estadoAFiltrar)
    },
}

module.exports = funciones;