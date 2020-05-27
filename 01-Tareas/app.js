const archivoFunciones = require("./funciones");

let [,,accion,parametro] = process.argv;

switch(accion){
    case "listar":
        let arrayTareas = archivoFunciones.leer();
        console.log("Listado de tareas:\n");
        arrayTareas.forEach((tarea,i) => {
            console.log("Tarea N°"+(i+1));
            console.log("Titulo: "+tarea.titulo);
            console.log("Estado: "+tarea.estado+"\n");
        });
        break;
    case "crear":
        if(parametro===undefined){
            console.log("Debe ingresar el nombre de la tarea");
        }else{
            let tareas = archivoFunciones.leer();
            tareas.push({titulo: parametro,estado: "pendiente"})
            archivoFunciones.guardarTarea(tareas);
            console.log("Se agregó la nueva tarea, con estado pendiente");
        }
        break;
    case "filtrar":
        if((parametro === "pendiente")||(parametro === "en progreso")||(parametro === "completo")){
            let tareasFiltrado = archivoFunciones.filtrarPorEstado(parametro);
            console.log("El array de tareas filtrado es:\n");
            console.log(tareasFiltrado);
        }else{
            console.log("El estado ingresado no es correcto");
        }
        break;
    case undefined:
        console.log("Debe ingresar una acción a realizar");
        break;
    default:
        console.log("No se entiende esa acción");
        break;
}