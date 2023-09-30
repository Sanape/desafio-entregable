import fs from 'fs';
import { __dirname } from './utils.js';
const path = __dirname + '/ProductsFile.json';

class ProductsManager {
  constructor() {
    this.products = []; //added to prevent undefined errors at server first calls
  }

  async #loadProductsFromFile() {
    //  try catch in case file doesn't exist
    try {
      if (fs.existsSync(path)) {
        this.products = JSON.parse(await fs.promises.readFile(path, 'utf-8'));
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
      await fs.promises.writeFile(path, JSON.stringify(this.products));
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProducts(queryObj = {}) {
    const { limit } = queryObj;
    try {
      await this.#loadProductsFromFile();
      return limit ? this.products.slice(0, +limit) : this.products;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async createProduct(product) {
    try {
      await this.#loadProductsFromFile();
      let id = this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1;

      const newProduct = { id, ...product, status: true };
      this.products.push(newProduct);
      this.#saveProductsToFile();
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      console.log('products', products);
      const product = products.find((u) => u.id === id);
      console.log('product', product);
      return product;
    } catch (error) {
      console.log('error catch');
      throw new Error(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts({});
      const product = products.find((u) => u.id === id);
      if (product) {
        const newArrayProducts = products.filter((u) => u.id !== id);
        await fs.promises.writeFile(path, JSON.stringify(newArrayProducts));
      }
      return product;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getProducts({});
      const index = products.findIndex((u) => u.id === id);
      if (index === -1) {
        return null;
      }
      const updateProduct = { ...products[index], ...obj };
      products.splice(index, 1, updateProduct);
      await fs.promises.writeFile(path, JSON.stringify(products));
      return updateProduct;
    } catch (error) {
      return error;
    }
  }
}

export const productManager = new ProductsManager();
