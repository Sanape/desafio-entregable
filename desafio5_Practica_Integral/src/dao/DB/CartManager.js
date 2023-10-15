import Manager from "./Manager.js";
import cart from "../models/cart.js";

class CartManager extends Manager {
  constructor() {
    super(cart);
  }

  async addProductToCart(cartId, productId) {
    try {
      const foundCart = await this.getById(cartId);

      if (!foundCart) {
        throw new Error("Cart not found");
      }

      const foundProduct = foundCart.products.find(
        (product) => product.productId === productId
      );

      if (foundProduct) {
        foundProduct.quantity++;
        foundCart.products = [...foundCart.products, ...[foundProduct]];
      } else {
        foundCart.products = [
          ...foundCart.products,
          ...[{ productId: productId, quantity: 1 }],
        ];
      }

      await foundCart.save();

      return "Product added";
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const foundCart = await this.getById(cartId);

      if (!foundCart) {
        throw new Error("Cart not found");
      }

      const foundProduct = foundCart.products.find(
        (product) => product.productId === productId
      );

      if (!foundProduct) {
        throw new Error("Cart does not contain the given product");
      }

      if (foundProduct.quantity > 1) {
        foundProduct.quantity--;
        foundCart.products = [...foundCart.products, ...[foundProduct]];
      } else {
        foundCart.products = foundCart.products.filter(
          (product) => product.productId !== productId
        );
      }

      await foundCart.save();

      return "Product deleted";
    } catch (error) {
      throw error;
    }
  }
}

export default new CartManager();
