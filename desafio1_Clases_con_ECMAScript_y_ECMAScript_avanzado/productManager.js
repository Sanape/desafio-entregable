class ProductManager {
  //agregue la posibilidad de instanciarlo con productos. Pero que por defecto sea un arreglo vacio
  constructor(initialProducts = []) {
    this.products = initialProducts;
  }

  addProduct(product) {
    let productValidation = this.#validateProduct(product);
    if (!productValidation.result) {
      return productValidation.msg;
    }

    this.products.push(product);
    return `${productValidation.msg} y agregado exitosamente`;
  }

  removeProduct(productId) {
    const productExists = this.products.some((product) => product.id === productId);
  
    if (!productExists) {
      console.log('El producto no existe en la lista.'); // message if product does not exist
      return;
    }
  
    this.products = this.products.filter((product) => product.id !== productId);
  }

  getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      console.log('Producto no encontrado.');
    }
    return product;
  }

  getProducts() {
    return this.products;
  }

  validateProduct(product) {
    if (
      !(product.id &&
        product.title &&
        product.description &&
        product.price &&
        product.thumbnail &&
        product.code &&
        product.stock)// check if stock is defined
    ) {
      return {
        result: false,
        msg: 'El producto no cumple con los campos requeridos.',
      };
    }
  
    if (
      this.products.some(
        (existingProduct) => existingProduct.code === product.code
      )
    ) {
      return {
        result: false,
        msg: 'Ya existe un producto con el mismo código.',
      };
    }
  
    return {
      result: true,
      msg: 'producto validado',
    };
  }

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.#getNextId();
  }

  static #getNextId() {
    if (!Product.nextId) {
      Product.nextId = 1;
    }
    return Product.nextId++;
  }
}

// Test

// Creación de instancia de ProductManager
const productManager = new ProductManager();

// Prueba 1: getProducts al inicio, debería devolver un arreglo vacío
console.log('Prueba 1 - getProducts al inicio:', productManager.getProducts());

// Prueba 2: addProduct
const productToAdd = new Product(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);
productManager.addProduct(productToAdd);
console.log('Prueba 2 - Producto agregado:', productManager.getProducts());

// Prueba 3: addProduct con campos repetidos (debería arrojar un error)
const repeatedProduct = new Product(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);
console.log(
  'Prueba 3 - Producto repetido:',
  productManager.addProduct(repeatedProduct)
);

// Prueba 4: getProductById con ID válido (debería devolver el producto)
const foundProduct = productManager.getProductById(1);
console.log('Prueba 4 - Producto encontrado:', foundProduct);

// Prueba 5: getProductById con ID no válido (debería mostrar mensaje de error y devolver undefined)
const notFoundProduct = productManager.getProductById(999);
console.log('Prueba 5 - Producto no encontrado:', notFoundProduct);

// Prueba 6: removeProduct para eliminar el producto agregado
productManager.removeProduct(1);
console.log(
  'Prueba 6 - Productos después de eliminar:',
  productManager.getProducts()
);
