//import { cartManager } from '../dao/FileSystem/cartManager.js';
import cartManager from '../dao/db/cartManager.js';

async function addProductToCartById(req, res, next) {
  try {
    const { cid, pid } = req.params;

    const result = await cartManager.addProductToCartById(
      cid,
      pid,
      req.body.quantity
    );

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function createCart(req, res, next) {
  try {
    const result = await cartManager.addCart(req.body);

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function getProductsOfCartById(req, res, next) {
  try {
    const { cid } = req.params;

    const { value: cart, msg, result } = await cartManager.getById(cid);

    res.status(200).json({ products: cart.products, message: msg });
  } catch (error) {
    next(error);
  }
}
async function deleteProductFromCart(req, res, next) {
  try {
    const { cid, pid } = req.params;

    const result = await cartManager.deleteProductFromCart(cid, pid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function deleteCart(req, res, next) {
  try {
    const { cid } = req.params;

    const result = await cartManager.deleteProductsFromCart(cid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function updateProductOfCartById(req, res, next) {
  try {
    const { cid, pid } = req.params;

    const result = await cartManager.updateProductOfCartById(
      cid,
      pid,
      req.body.quantity
    );

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function updateProductsOfCart(req, res, next) {
  try {
    const { cid } = req.params;

    const result = await cartManager.updateById(cid, req.body);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}
export {
  addProductToCartById,
  createCart,
  getProductsOfCartById,
  deleteProductFromCart,
  deleteCart,
  updateProductOfCartById,
  updateProductsOfCart,
};
