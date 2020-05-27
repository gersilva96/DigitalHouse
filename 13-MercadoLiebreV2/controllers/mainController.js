const fs = require("fs");
const path = require("path");

//Funciones privadas
const readHTML = fileName => fs.readFileSync(path.join(__dirname,"..","views",fileName,".html"),"utf-8");
const items = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","productsDataBase.json"),"utf-8"));
const toThousand = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

//Funciones públicas
const mainController = {
    home: (req,res) => {
        const productsVisited = items.filter(product => product.category === "visited");
        const productsInSale = items.filter(product => product.category === "in-sale");
        res.render("index", {productsVisited, productsInSale, formatPrice});
    },
};

module.exports = mainController;