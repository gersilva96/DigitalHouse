const fs = require('fs');
const path = require('path');
const db = require("../database/models");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const saveProducts = (array => fs.writeFileSync(productsFilePath, JSON.stringify(array)));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

const controller = {
	// Root - Show all products
	root: (req, res) => {
		db.Product.findAll()
			.then(products => {
				res.render("products", {products, toThousand, formatPrice});
			})
			.catch(error => {
				res.render("error");
			});
	},

	// Detail - Detail from one product
	detail: (req,res) => {
		db.Product.findByPk(req.params.productId)
			.then(product => {
				res.render("detail",{product, toThousand, formatPrice});
			})
			.catch(error => {
				res.render("error");
			});
    },

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},

	// Create -  Method to store
	store: (req, res) => {
		let lastId = 0;
		products.forEach(producto => {
			if(producto.id > lastId) {
				lastId = producto.id;
			}
		});
		const productToCreate = {
			id: lastId+1,
			name: req.body.name,
			price: parseFloat(req.body.price),
			discount: parseFloat(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: "image"
		};
		products.push(productToCreate);
		saveProducts(products);
		res.send("Agregado!")
	},

	// Update - Form to edit
	edit: (req, res) => {
		const productToEdit = products.find(item => item.id == req.params.productId);
		res.render("product-edit-form", {productToEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		let productEdited = null;
		products.forEach(product => {
			if(product.id == req.params.productId) {
				product.name = req.body.name;
				product.price = parseFloat(req.body.price);
				product.discount = parseFloat(req.body.discount);
				product.category = req.body.category;
				product.description = req.body.description;
				productEdited = product;
			}
		});
		saveProducts(products);
		res.send("Editado!");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productsNew = products.filter(product => product.id != req.params.productId);
		saveProducts(productsNew);
		res.send("Eliminado!");
	}
};

module.exports = controller;