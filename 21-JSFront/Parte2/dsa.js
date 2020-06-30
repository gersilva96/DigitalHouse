let array = [
    {
        nombre: "Ger",
        gasto: 243243
    },
    {
        nombre: "Gas",
        gasto: 23
    },
    {
        nombre: "Ana",
        gasto: 3213
    }
];

console.log(array);

let nuevoArray = array;
nuevoArray.sort((a, b) => a.gasto - b.gasto);

console.log(array);

console.log(nuevoArray);