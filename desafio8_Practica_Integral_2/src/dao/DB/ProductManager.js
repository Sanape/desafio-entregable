import Manager from "./Manager.js";
import product from "../models/product.js";

class ProductManager extends Manager {
  constructor() {
    super(product);
  }

  async getProducts(query, limit = 10, page = 1, sort = 0) {
    const options = {
      page: page,
      limit: limit,
      customLabels: {
        docs: "payload",
      },
    };

    if (+sort) {
      options.sort = { price: +sort };
    }

    if (query) {
      const foundObjects = await this.model.paginate(
        JSON.parse(query),
        options
      );
      return foundObjects;
    } else {
      const foundObjects = await this.model.paginate(query, options);
      return foundObjects;
    }
  }
}

export default new ProductManager();
