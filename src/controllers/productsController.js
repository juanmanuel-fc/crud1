const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Root - Show all products
	index: (req, res) => {

		// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		res.render("products", {products: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const id = parseInt(req.params.id);
				
		foundProduct = products.filter ( product => {

			return product.id === id;
		})

		res.render("detail", {product: foundProduct});

	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: function (req, res) {

		// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// calculate the next id
		let max = 0;

		for (let i=0; i<products.length; i++) {
			if (products[i].id > max) {
				max = products[i].id
			}
		}
		
		let nuevoProducto = {
			id: max + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		};
		
		products.push(nuevoProducto);

		// Esto está bien
		const productoJSON = JSON.stringify(products, null, "\t");

		fs.writeFileSync(productsFilePath, productoJSON);

		// Esto está mal
		// JSON.stringify(fs.writeFileSync(productsFilePath, products));

		res.redirect("/");
	},

	// // Update - Form to edit
	// edit: (req, res) => {
	// 	// Do the magic
	// },
	// // Update - Method to update
	// update: (req, res) => {
	// 	// Do the magic
	// },

	// // Delete - Delete one product from DB
	// destroy : (req, res) => {
	// 	// Do the magic
	// }
};

module.exports = controller;