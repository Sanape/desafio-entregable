import express from "express";

import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById
} from "../controllers/productsController.js";

import { body_must_contain_attributes } from "../middlewares/validateBodyRequirements.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post(
  "/",
  body_must_contain_attributes([
    "title",
    "description",
    "code",
    "price",
    "status",
    "stock",
    "category",
  ]),

  addProduct
);

router.put(
  "/:pid",
  updateProductById
);

router.delete(
  "/:pid",
  deleteProductById
)

export default router;
