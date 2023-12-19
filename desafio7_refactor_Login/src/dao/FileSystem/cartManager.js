import fs from 'fs';
import Cart from '../models/cart.js';

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = []; //added to prevent undefined errors on server first calls
  }

  async #loadCartFromFile() {
    try {
      if (fs.existsSync(this.path)) {
        this.carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
      } else {
        this.cart = [];
      }
    } catch (err) {
      this.carts = [];
      throw new Error(err);
    }
  }

  async #saveCartToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    } catch (err) {
      throw new Error(err);
    }
  }

  async addCart(cart) {
    try {
      await this.#loadCartFromFile();
      let id = this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1;

      let newCart = new Cart(id, cart.products);

      this.carts.push(newCart);

      await this.#saveCartToFile();
      return `carrito con los productos:\n\n${newCart.products
        .map(
          (product) =>
            `CANTIDAD: ${product.quantity}
        ID: ${product.id}`
        )
        .join('\n---------------\n')}----------\n Agregado exitosamente`;
    } catch (error) {
      throw error;
    }
  }
  async getCarts(limit) {
    try {
      await this.#loadCartFromFile();

      return limit ? this.carts.slice(0, limit) : this.carts;
    } catch (error) {
      return error;
    }
  }

  async getCartById(cartId) {
    try {
      await this.#loadCartFromFile();

      const CartIndex = this.getCartIndex(cartId);

      if (!CartIndex.result) {
        return {
          ...CartIndex,
          msg: `No se pudo encontrar porqué: ${CartIndex.msg}`,
        };
      }
      return {
        result: true,
        msg: `${CartIndex.msg} y se encontro sus productos`,
        value: this.carts[CartIndex.value],
      };
    } catch (error) {
      throw error;
    }
  }

  getCartIndex(cartId) {
    try {
      const CartIndex = this.carts.findIndex((cart) => +cartId === cart.id);
      if (CartIndex == -1) {
        return {
          result: false,
          msg: `El carrito con el id ${cartId} no existe en la lista.`,
          value: undefined,
        };
      }
      return {
        result: true,
        msg: `El carrito con el id ${cartId} existe en la lista`,
        value: CartIndex,
      };
    } catch (error) {
      return error;
    }
  }

  async addProductToCartById(idCart, idProduct) {
    try {
      await this.#loadCartFromFile();

      const { result, msg, value: cart } = await this.getCartById(idCart);
      if (!result) {
        throw Error(msg);
      }
      const foundProductIndex = cart.products.findIndex(
        (product) => product.id === +idProduct
      );

      if (foundProductIndex === -1) {
        cart.products.push({
          id: +idProduct,
          quantity: 1,
        });
      } else {
        cart.products[foundProductIndex].quantity++;
      }

      const foundCartIndex = this.getCartIndex(+idCart);

      this.carts[foundCartIndex] = cart;

      this.#saveCartToFile();
      return `agregado correctamente\n prodcuto con id:\t${idProduct} al carrito`;
    } catch (error) {
      throw error;
    }
  }
}

export const cartManager = new CartManager('carts.json');
