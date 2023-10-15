import Manager from "./Manager.js";
import product from "../models/product.js";

class ProductManager extends Manager {
  constructor() {
    super(product);
  }

  async getAll(limit = 0) {
    const foundObjects = this.model.find().limit(limit);
    return foundObjects;
  }
}

export default new ProductManager();
