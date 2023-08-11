const fs = require('fs');

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = 0; 
    }
}

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }

    addProduct(productData) {
        const newId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const newProduct = new Product({ ...productData, id: newId });
        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log('Producto no encontado');
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
        } else {
            console.log('Product no encontrado');
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
        } else {
            console.log('Producto no encontrado');
        }
    }
}


const productManager = new ProductManager('products.json');

productManager.addProduct({
    title: 'Product 1',
    description: 'Description for Product 1',
    price: 19.99,
    thumbnail: 'path/to/thumbnail1.jpg',
    code: 'P1',
    stock: 10
});

productManager.addProduct({
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 29.99,
    thumbnail: 'path/to/thumbnail2.jpg',
    code: 'P2',
    stock: 5
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));

productManager.updateProduct(1, { price: 24.99 });

productManager.deleteProduct(2);






      