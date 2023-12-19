import BaseMongo from './base.mongo.js';
import { cartsModel } from '../models/carts.model.js';

class CartsMongo extends BaseMongo {
    constructor() {
        super(cartsModel, "products.product");
    }

    async findAndPopulate(cid) {
        const cartFound = await cartsModel.findById(cid).populate("products.product").lean();
        return cartFound;
    }

    async addToCart(cid, obj) {
        const cartFound = await cartsModel.findById(cid);
        if (!cartFound) {
            console.log(`No se encontro el carrito: ${cid}`);
        } else {
            cartFound.products = [...cartFound.products, ...obj.products];
        }
        cartFound.save();
        return cartFound;
    }

    async deleteAllProducts(cid) {
        const cartFound = await cartsModel.findById(cid);
        if (!cartFound) {
            console.log(`No se encontro el carrito: ${cid}`);
        } else {
            cartFound.products = [];
        }
        cartFound.save();
        return cartFound;
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cartFound = await cartsModel.findById(cid);
        const productFound = cartFound.products.find((product) => product.product.toString() === pid);

        if (!productFound) {
            console.log("No se encontro el producto");
        }else{
            productFound.quantity = quantity;
        }
        cartFound.save();
        return cartFound;
    }

    async deleteOneProduct(cid, pid) {
        const cartFound = await cartsModel.findById(cid);
        const productFound = cartFound.products.find((product) => product.product.toString() === pid);

        if (!productFound) {
            console.log("No se encontro el producto");
        }else{
            cartFound.products = cartFound.products.filter((product) => product.product.toString() !== pid);
        }
        cartFound.save();
        return cartFound;
    }
}

export const cartsMongo = new CartsMongo();