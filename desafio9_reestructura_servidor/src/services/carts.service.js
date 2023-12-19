import { cartsMongo } from '../daos/carts.mongo.js';

class CartsService {
    async findAll() {
        const response = await cartsMongo.findAll();
        return response;
    }

    async findAndPopulate(id) {
        const response = await cartsMongo.findAndPopulate(id);
        return response;
    }

    async createOne(obj) {
        const response = await cartsMongo.createOne(obj);
        return response;
    }

    async addToCart(id, obj) {
        const response = await cartsMongo.addToCart(id, obj);
        return response;
    }

    async deleteAllProducts(id) {
        const response = await cartsMongo.deleteAllProducts(id);
        return response;
    }

    async updateProductQuantity(cid, pid, quantity) {
        const response = await cartsMongo.updateProductQuantity(cid, pid, quantity);
        return response;
    }

    async deleteOneProduct(cid, pid) {
        const response = await cartsMongo.deleteOneProduct(cid, pid);
        return response;
    }
}

export const cartsService = new CartsService();