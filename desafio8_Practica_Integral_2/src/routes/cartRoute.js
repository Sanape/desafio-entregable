import express from "express";

import {
  addProductToCartById,
  createCart,
  getProductsOfCartById,
  deleteCart,
  deleteProductFromCart,
  updateProductOfCartById,
  updateProductsOfCart,
  getCartOfActiveUser
} from "../controllers/cartController.js";

import { body_must_contain_attributes } from "../middlewares/validateBodyRequirements.js";

const router = express.Router();

router.get("/", getCartOfActiveUser);

router.get("/:cid", getProductsOfCartById);

router.post("/", body_must_contain_attributes(["products"]), createCart);

router.post("/:cid/products/:pid", body_must_contain_attributes(["quantity"]), addProductToCartById);

router.delete("/:cid/products/:pid", deleteProductFromCart);

router.put("/:cid/products/:pid", body_must_contain_attributes(["quantity"]), updateProductOfCartById);

router.put("/:cid", body_must_contain_attributes(["products"]), updateProductsOfCart);

router.delete("/:cid", deleteCart); 

export default router;
