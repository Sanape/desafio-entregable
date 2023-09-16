import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async #loadProductsFromFile() {
    //  try catch in case file doesn't exist
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
      } else {
        this.products = [];
      }
    } catch (err) {
      console.error(err);
      this.products = [];
    }
  }

  async saveProductsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (err) {
      console.error(err);
    }
  }

  async getProducts(queryObj) {
    await this.#loadProductsFromFile();
    const { limit } = queryObj;
    return limit ? this.products.slice(0, limit) : this.products;
  }

  addProduct(product) {
    let productValidation = this.#validateProduct(product);
    if (!productValidation.result) {
      return productValidation.msg;
    }

    // Here is where we use the Product class to assign an id
    let newProduct = new Product(
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock
    );
    this.products.push(newProduct);
    this.saveProductsToFile();
    return `${productValidation.msg} y agregado exitosamente`;
  }

  getProductsIndex(productId) {
    const productIndex = this.products.findIndex(
      (product) => +productId === product.id
    );
    if (productIndex == -1) {
      return {
        result: false,
        msg: `El producto con el id ${productId} no existe en la lista.`,
        value: undefined,
      };
    }
    return {
      result: true,
      msg: `El producto con el id ${productId} existe en la lista`,
      value: productIndex,
    };
  }

  async getProductById(productId) {
    await this.#loadProductsFromFile();
    let productIndex = this.getProductsIndex(+productId);
    if (!productIndex.result) {
      return {
        ...productIndex,
        msg: `No se pudo encontrar porqué: ${productIndex.msg}`,
      };
    }
    return {
      result: true,
      msg: `${productIndex.msg} y se encontro`,
      value: this.products[productIndex.value],
    };
  }

  async updateProduct(productId, updatedProduct) {
    const productGet = await this.getProductById(productId);
    if (!productGet.result) {
      return ` No se pudo actualizar porqué: ${productGet.msg}`;
    }

    // Update the product
    Object.assign(productGet.value, updatedProduct);
    await this.saveProductsToFile();
    return `actualizado correctamente`;
  }

  async deleteProduct(productId) {
    let productIndex = this.getProductsIndex(productId);
    if (!productIndex.result) {
      return `No se pudo borrar porqué: ${productIndex.msg}`;
    }
    this.products.splice(productIndex, 1);
    await this.saveProductsToFile();
    return `borrado correctamente`;
  }

  #validateProduct(product) {
    if (
      product.title === undefined ||
      product.description === undefined ||
      product.price === undefined ||
      product.thumbnail === undefined ||
      product.code === undefined ||
      product.stock === undefined // check if stock is defined
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
async function Test() {
  // Creo una instancia de ProductManager
  let productManager = new ProductManager('products.txt');

  // Prueba 1: getProducts al inicio, debería devolver un arreglo vacío
  console.log(
    'Prueba 1 - getProducts al inicio:',
    await productManager.getProducts()
  );

  // Prueba 2: addProduct
  const testProducts = [
    {
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    },
    {
      title: 'producto prueba 2',
      description: 'Este es un producto prueba',
      price: 100,
      thumbnail: 'Sin imagen',
      code: 'abc111',
      stock: 200,
    },
    {
      title: 'producto prueba 3',
      description: 'Este es un producto prueba',
      price: 450,
      thumbnail: 'Sin imagen',
      code: 'abc222',
      stock: 20,
    },
    {
      title: 'producto prueba 4',
      description: 'Este es un producto prueba',
      price: 230,
      thumbnail: 'Sin imagen',
      code: 'abc333',
      stock: 5,
    },
  ];

  testProducts.map(async (product) => {
    console.log(
      'Prueba 2 - Agregar producto: ',
      await productManager.addProduct(product)
    );
  });

  console.log(
    'Prueba 3 - getProducts muestra el producto:',
    await productManager.getProducts()
  );

  // // Prueba 4: getProductById con ID válido (debería devolver el producto)
  // const foundProduct = await productManager.getProductById(1);
  // console.log(`Prueba 4 - ${foundProduct.msg}`, foundProduct.value);

  // // Prueba 5: getProductById con ID no válido (debería mostrar mensaje de error y devolver undefined)
  // const notFoundProduct = await productManager.getProductById(999);
  // console.log(`Prueba 5 - ${notFoundProduct.msg}`, notFoundProduct.value);

  const update = {
    title: 'Producto actualizado',
    description: 'Este es un producto actualizado',
    price: 100,
    thumbnail: 'Imagen actualizada',
    code: 'abc123',
    stock: 50,
  };
  // Prueba 6: updateProduct para actualizar el producto agregado
  await productManager.updateProduct(1, update);
  console.log(
    'Prueba 6 - Producto después de actualizar:',
    await productManager.getProductById(1)
  );
  // Prueba 7: deleteProduct para eliminar el producto agregado
  // productManager.deleteProduct(1);
  // console.log(
  //   'Prueba 7 - Productos después de eliminar:',
  //   await productManager.getProducts()
  // );

  // try {
  //   await fs.promises.unlink('products.txt');
  // } catch (err) {
  //   console.error(err);
  // }
}

//Test();

export const productManager = new ProductManager('products.txt');
