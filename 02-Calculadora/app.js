const operaciones = require("./operaciones");

let [node,path,accion,...operadoresString] = process.argv;

switch(accion){
    case "sumar":
        let operadoresASumar = operadoresString.map(elemento => Number(elemento));
        console.log(operaciones.sumar(operadoresASumar));
        break;
    case "restar":
        let operadoresARestar = operadoresString.map(elemento => Number(elemento));
        console.log(operaciones.restar(operadoresARestar));
        break;
    case "multiplicar":
        let operadoresAMultiplicar = operadoresString.map(elemento => Number(elemento));
        console.log(operaciones.multiplicar(operadoresAMultiplicar));
        break;
    case "dividir":
        let operadoresADividir = operadoresString.map(elemento => Number(elemento));
        console.log(operaciones.dividir(operadoresADividir));
        break;
    case undefined:
        console.log("No se ingresó ninguna operación");
        break;
    default:
        console.log("No se reconoce la operación ingresada");
        break;
}