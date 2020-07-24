const {Products} = require('../database/models');
const {Op} = require("sequelize");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => {
    let priceDot;
    if (discount == undefined) {
        priceDot = toThousand(price.toFixed(2));
    } else {
        priceDot = toThousand((price*(1-(discount/100))).toFixed(2));
    }
    let first = priceDot.slice(0,-3);
    let last = priceDot.slice(-3);
    let lastReplaced = last.replace(".", ",");
    return `${first}${lastReplaced}`;
};

const controller = {
	root: async (req, res) => {
		try {
			const products = await Products.findAll();
			res.render("index", {products, formatPrice});
		} catch(error) {
			res.render("error", {error});
		}
	},
	search: async (req, res) => {
		try {
			const results = await Products.findAll({
				where: {
					name: {
						[Op.substring]: req.query.keywords
					}
				}
			});
			res.render("results", {results, formatPrice, search: req.query.keywords});
		} catch(error) {
			res.render("error", {error});
		}
	},
	offers: async (req, res) => {
		try {
			const products = await Products.findAll({
				where: {
					category: "in-sale"
				}
			});
			res.render("offers", {products, formatPrice});
		} catch(error) {
			res.render("error", {error});
		}
	}
};

module.exports = controller;
