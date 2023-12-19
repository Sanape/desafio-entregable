import Manager from './manager.js';
import cartsModel from '../models/cart.model.js';

class CartManager extends Manager {
  constructor() {
    super(cartsModel);
  }

  async addProductToCartById(cartId, productId, quantity) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error('Cart not found');
      }

      const foundProduct = foundCart.products.find(
        (product) => product.productId.toString() === productId
      );

      if (foundProduct) {
        foundProduct.quantity = foundProduct.quantity + +quantity;
      } else {
        foundCart.products = [
          ...foundCart.products,
          ...[{ productId: productId, quantity: quantity }],
        ];
      }

      await foundCart.save();

      return `Agregado correctamente\n prodcuto con id:\t${productId} al carrito`;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCarts(productId) {
    try {
      const carts = await this.getAll();

      carts.forEach(async (cart) => {
        await this.deleteProductFromCart(cart._id, productId);
      });

      return `Productos eliminados`;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error('Cart not found');
      }

      foundCart.products = foundCart.products.filter(
        (product) => product.productId.toString() !== productId
      );

      await foundCart.save();

      return `Eliminado correctamente\n prodcuto con id:\t${productId} del carrito`;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductsFromCart(cartId) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error('Cart not found');
      }

      foundCart.products = [];

      await foundCart.save();

      return 'Products deleted';
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const foundObject = await this.model
        .findById(id)
        .populate({ path: 'products.productId' });
      if (!foundObject) {
        return {
          result: false,
          msg: `El carrito con el id ${id} no existe.`,
          value: undefined,
        };
      }
      return {
        result: true,
        msg: `El carrito con el id ${id} existe en la lista`,
        value: foundObject,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProductOfCartById(cartId, productId, quantity) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error('Cart not found');
      }

      const foundProduct = foundCart.products.find(
        (product) => product.productId.toString() === productId
      );

      if (foundProduct) {
        foundProduct.quantity = quantity;
      } else {
        throw new Error('Product not found');
      }

      await foundCart.save();

      return 'Product updated';
    } catch (error) {
      throw error;
    }
  }
}

export default new CartManager();
