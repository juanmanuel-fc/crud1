const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Root - Show all products
	index: (req, res) => {

		res.render("products", {products: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {

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
	edit: (req, res) => {

		const id = parseInt(req.params.id);

		const foundProduct = products.filter( item => {

			if ( item.id === id ) {
				return id;
			}

		});

		res.render("product-edit-form", {product: foundProduct});
	},


	// // Update - Method to update
	update: (req, res) => {

		// get the id to edit
		const id = parseInt(req.params.id);

		// var to store the index of products array where id is located
		let editThisIndex = null;

		// find the array index where the id is
		products.forEach( (item, index) => {
			if (item.id === id) {
				editThisIndex = index;
			}
		});

		// remove the index from the array
		products.splice(editThisIndex, 1);
		
		// add a new element into the products array, with the info of 
		let productoEditado = {
			id: req.body.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		};

		products.splice(editThisIndex, 0, productoEditado);

		// Esto está bien
		const productoJSON = JSON.stringify(products, null, "\t");

		fs.writeFileSync(productsFilePath, productoJSON);

		// Esto está mal
		// JSON.stringify(fs.writeFileSync(productsFilePath, products));

		res.redirect("/");

	},

	// // Delete - Delete one product from DB
	erase: (req, res) => {
		
		// erase this id
		const id = req.params.id;

		// var to store the index of products array to be erased
		let eraseThis = null;

		// find the array index where the id is
		products.forEach( (item, index) => {
			if (item.id === id) {
				eraseThis = index;
			}
		});

		// remove the index from the array
		products.splice(eraseThis, 1);

		// write the changes to the JSON file
		const productoJSON = JSON.stringify(products, null, "\t");
		fs.writeFileSync(productsFilePath, productoJSON);

		res.redirect("/products");


	}
};



module.exports = controller;