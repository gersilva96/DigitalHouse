const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productToEdit = {};
products.forEach(product => {
    if(product.id == 1) {
        product.name = "Hola";
    }
});
const productos = JSON.stringify(products);
console.log(productos)
fs.writeFileSync(productsFilePath, productos);