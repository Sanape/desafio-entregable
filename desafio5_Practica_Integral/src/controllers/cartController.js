import cartManager from "../dao/DB/CartManager.js";

async function addProductToCartById(req, res, next) {
  try {
    const { cid, pid } = req.params;

    const result = await cartManager.addProductToCart(cid, pid)

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function createCart(req, res, next) {
  try {
    const result = await cartManager.create(req.body);

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function getProductsOfCartById(req, res, next) {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getById(cid);

    res.status(200).json({ products: cart.products });
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

    const result = await cartManager.deleteById(cid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}
export { addProductToCartById, createCart, getProductsOfCartById, deleteProductFromCart, deleteCart };
