const fs = require("fs");
const path = require("path");

//Funciones privadas
const items = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","productsDataBase.json"),"utf-8"));
const toThousand = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

//Funciones públicas
const productController = {
    detail: (req,res) => {
        const product = items.find(item => item.id == req.params.id);
        if(product.category === req.params.category) {
            res.render("productDetail",{product, toThousand, formatPrice});
        } else {
            res.render("error");
        }
    }
}

module.exports = productController;