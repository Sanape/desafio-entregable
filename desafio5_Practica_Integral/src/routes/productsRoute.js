import express from "express";

import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
} from "../controllers/productsController.js";

import { body_must_contain_attributes } from "../middlewares/validateBodyRequirements.js";

const router = express.Router();

router.get("/", getAllProducts);

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
