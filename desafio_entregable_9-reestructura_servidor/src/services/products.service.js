import { productsMongo } from '../daos/products.mongo.js';
//import { productsErrors } from './products.error.js';

class ProductsService {
    async findAll() {
        const response = await productsMongo.findAll();
        return response;
    }

    async findAllFiltered(obj) {
        const response = await productsMongo.findAllFiltered(obj);
        return response;
    }

    async findById(id) {
        const response = await productsMongo.findById(id);
        return response;
    }

    async createOne(obj) {
        const response = await productsMongo.createOne(obj);
        return response;
    }

    async updateOne(obj) {
        const { id, ...productData } = obj; //REVISAR
        const response = await productsMongo.updateOne(id, productData); //REVISAR
        return response;
    }

    async deleteOne(id) {
        const response = await productsMongo.deleteOne(id);
        return response;
    }
}

export const productsService = new ProductsService();