import fs from 'fs';
import Product from '../models/product.js';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = []; //added to prevent undefined errors at server first calls
  }

  async #loadProductsFromFile() {
    //  try catch in case file doesn't exist
    try {
      if (fs.existsSync(this.path)) {
        this.products = JSON.parse(
          await fs.promises.readFile(this.path, 'utf-8')
        );
      } else {
        this.products = [];
      }
    } catch (err) {
      this.products = [];
      throw new Error(err);
    }
  }

  async #saveProductsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProducts(queryObj) {
    await this.#loadProductsFromFile();
    return queryObj ? this.products.slice(0, queryObj.limit) : this.products;
  }

  async addProduct(product) {
    await this.#loadProductsFromFile();
    let productValidation = this.#validateProduct(product);
    if (!productValidation.result) {
      return productValidation.msg;
    }

    let id = this.products.length
      ? this.products[this.products.length - 1].id + 1
      : 1;

    let newProduct = new Product(
      product.title,
      product.description,
      product.price,
      product.thumbnails,
      product.code,
      product.status,
      product.stock,
      id
    );
    this.products.push(newProduct);
    this.#saveProductsToFile();
    return `${productValidation.msg} y agregado exitosamente`;
  }

  getProductIndex(productId) {
    try {
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
    } catch (error) {
      return error;
    }
  }

  async getProductById(productId) {
    try {
      await this.#loadProductsFromFile();
      let productIndex = this.getProductIndex(+productId);
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
    } catch (error) {
      return error;
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      const productGet = await this.getProductById(productId);
      if (!productGet.result) {
        return ` No se pudo actualizar porqué: ${productGet.msg}`;
      }

      // Update the product
      const updatedProduct = Object.assign(productGet.value, updatedProduct);
      await this.#saveProductsToFile();
      return `actualizado correctamente\n prodcuto:\t${updatedProduct} `;
    } catch (error) {
      return error;
    }
  }
  async deleteProduct(productId) {
    try {
      let productIndex = this.getProductIndex(productId);
      if (!productIndex.result) {
        return `No se pudo borrar porqué: \n\t${productIndex.msg}`;
      }
      this.products.splice(productIndex, 1);
      await this.#saveProductsToFile();
      return `borrado correctamente\n`;
    } catch (error) {
      return error;
    }
  }

  async addImageToProductById(id, imagePath) {
    try {
      let {
        value: product,
        msg: msg1,
        result: resultProduct,
      } = await this.getProductById(id);
      if (!resultProduct) {
        throw new Error(msg1);
      }
      await this.#loadProductsFromFile();

      let {
        value: index,
        msg: msg2,
        result: resultIndex,
      } = this.getProductsIndex(id);
      if (!resultIndex) {
        throw new Error(msg2);
      }
      product.thumbnails.push({
        id: product.thumbnails.length ? product.thumbnails.length : 1,
        url: imagePath,
      });

      this.products[resultIndex] = {
        ...product,
      };

      await this.#saveProductsToFile();

      return `Imagen actualizada correctamente`;
    } catch (error) {
      throw error;
    }
  }

  async deleteImageOfProductById(idProduct, idImage) {
    try {
      let {
        value: product,
        msg: msg1,
        result: resultProduct,
      } = await this.getProductById(id);
      if (!resultProduct) {
        throw new Error(msg1);
      }
      await this.#loadProductsFromFile();

      let {
        value: index,
        msg: msg2,
        result: resultIndex,
      } = this.getProductsIndex(id);
      if (!resultIndex) {
        throw new Error(msg2);
      }

      const imageIndex = product.thumbnails.findIndex(
        (image) => image.idPhoto === +idImage
      );

      product.thumbnails.splice(imageIndex, 1);

      this.products[index] = {
        ...product,
      };

      await this.#saveProductsToFile();

      return `Imagen borrada correctamente`;
    } catch (error) {
      throw error;
    }
  }

  #validateProduct(product) {
    console.log(product);
    if (
      product.title === undefined ||
      product.description === undefined ||
      product.price === undefined ||
      //product.thumbnail === undefined || no es obligatorio
      product.code === undefined ||
      product.stock === undefined
    ) {
      return {
        result: false,
        msg: 'El producto no cumple con los campos requeridos.',
      };
    }

    if (
      this.products !== undefined &&
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
      thumbnails: [],
      code: 'abc123',
      stock: 25,
    },
    {
      title: 'producto prueba 2',
      description: 'Este es un producto prueba',
      price: 100,
      thumbnails: [],
      code: 'abc111',
      stock: 200,
    },
    {
      title: 'producto prueba 3',
      description: 'Este es un producto prueba',
      price: 450,
      thumbnails: [],
      code: 'abc222',
      stock: 20,
    },
    {
      title: 'producto prueba 4',
      description: 'Este es un producto prueba',
      price: 230,
      thumbnails: [],
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

export const productManager = new ProductManager('products.json');
