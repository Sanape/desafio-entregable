import BaseMongo from './base.mongo.js';
import { productsModel } from '../models/products.model.js';

class ProductsMongo extends BaseMongo {
    constructor() {
        super(productsModel);
    }

    async findAllFiltered(obj) {
        const { limit = 10, page = 1, sort: sorter, ...queryFilter } = obj;
        const response = await productsModel.paginate(queryFilter, { limit, page, sort: { price: sorter === 'asc' ? 1 : -1 }, lean: true, });
        return response;
    }
}

export const productsMongo = new ProductsMongo();