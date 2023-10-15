import express from "express";

import {
  addProductToCartById,
  createCart,
  getProductsOfCartById,
  deleteCart,
  deleteProductFromCart,
} from "../controllers/cartController.js";

import { body_must_contain_attributes } from "../middlewares/validateBodyRequirements.js";

const router = express.Router();

router.get("/:cid", getProductsOfCartById);

router.post("/", body_must_contain_attributes(["products"]), createCart);

router.post("/:cid/product/:pid", addProductToCartById);

router.delete("/:cid/product/:pid", deleteProductFromCart);

router.delete("/:cid", deleteCart);

export default router;
