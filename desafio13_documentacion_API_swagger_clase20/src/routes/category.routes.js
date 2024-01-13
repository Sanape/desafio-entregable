import express from "express";

import {
  addProductToCategory,
  createCategory,
  deleteCategory,
  deleteProductFromCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import isAdmin from "../middlewares/checkRole.middleware.js";

const router = express.Router();

router.get("/", getCategories); //route:✓ anda:✓

router.post( //route:✓ anda:✓
    "/",
    isAuthenticated,
    isAdmin,
    body_must_contain_attributes(["category_name"]),
    createCategory
  );
  

router.post( //anda:✓
  "/product",
  isAuthenticated,
  isAdmin,
  body_must_contain_attributes(["productId", "categoryId"]),
  addProductToCategory
);

router.delete("/:ctid/product/:pid", isAuthenticated, isAdmin, deleteProductFromCategory);//route:✓ anda:✓

router.delete("/:ctid", isAuthenticated, isAdmin, deleteCategory);//route:✓ anda:✓

router.put("/:ctid", isAuthenticated, isAdmin, updateCategory);//route:✓ anda:✓

export default router;
