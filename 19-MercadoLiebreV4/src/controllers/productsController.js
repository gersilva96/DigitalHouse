const fs = require("fs");
const path = require("path");
const glob = require("glob");
const {Products} = require("../database/models");
const {validationResult} = require("express-validator");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => {
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
	// Root - Show all products
	root: async (req, res) => {
		try {
			const products = await Products.findAll();
			res.render("products", {products, formatPrice});
		} catch(error) {
			res.render("error", {error});
		}
	},

	// Detail - Detail from one product
	detail: async (req, res) => {
		try {
			const product = await Products.findOne({
				where: {
					id: parseInt(req.params.productId),
					category: req.params.productCategory
				}
			});
			res.render("detail", {product, formatPrice});
		} catch(error) {
			res.render("error", {error});
		}
    },

	// Create - Form to create
	create: async (req, res) => {
		try {
			res.render("product-create-form");
		} catch(error) {
			res.render("error", {error});
		}
	},

	// Create -  Method to store
	store: async (req, res) => {
		try {
			let errors = validationResult(req);
			if (typeof req.file === 'undefined') {
                let newError = {
                   value: '',
                   msg: 'Debe cargar una imagen de producto',
                   param: 'image',
                   location: 'files'
                }
                errors.errors.push(newError);
            }
            const existsCode = await Products.findOne({
                where: {
                    code: parseInt(req.body.code)
                }
            });
            if (existsCode != null) {
                let newError = {
                    value: '',
                    msg: 'Ya existe un producto con el código ingresado',
                    param: 'code',
                    location: 'body'
                };
                errors.errors.push(newError);
            }
			if (errors.isEmpty()) {
				await Products.create({
					name: req.body.name,
					code: parseInt(req.body.code),
					price: parseFloat(req.body.price),
					discount: parseInt(req.body.discount),
					category: req.body.category,
					description: req.body.description,
					image: req.file.filename
				});
				res.redirect("/products");
			} else {
				res.render("product-create-form", {errors: errors.errors});
			}
		} catch(error) {
			res.render("error", {error});
		}
	},

	// Update - Form to edit
	edit: async (req, res) => {
		try {
			const productToEdit = await Products.findByPk(req.params.productId);
			res.render("product-edit-form", {productToEdit});
		} catch(error) {
			res.render("error", {error});
		}
	},
	// Update - Method to update
	update: async (req, res) => {
		try {
			let errors = validationResult(req);
			if (errors.isEmpty()) {
				await Products.update({
					name: req.body.name,
					price: parseFloat(req.body.price),
					discount: parseInt(req.body.discount),
					category: req.body.category,
					description: req.body.description
				}, {
					where: {
						id: req.params.productId
					}
				});
				res.redirect("/products");
			} else {
				const productToEdit = await Products.findByPk(req.params.productId);
				res.render("product-edit-form", {errors: errors.errors, productToEdit});
			}
		} catch(error) {
			res.render("error", {error});
		}
	},

	// Delete - Delete one product from DB
	destroy : async (req, res) => {
		try {
			const product = await Products.findByPk(req.params.productId);
			const imageFile = glob.sync(path.join(__dirname, "..", "..", "public", "images", "products", `img-prod-code${product.code}.{jpg,jpeg,png}`));
			console.log(imageFile);
            imageFile.forEach(file => fs.unlinkSync(file));
			await Products.destroy({
				where: {
					id: req.params.productId
				}
			});
			res.redirect("/products");
		} catch(error) {
			res.render("error", {error});
		}
	}
};

module.exports = controller;