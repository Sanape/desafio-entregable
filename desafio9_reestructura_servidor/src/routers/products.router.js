import { Router } from 'express';
import { productsController } from '../controllers/products.controller.js';

const router = Router();

router.get("/", productsController.findAllProductsAndFilter)

router.get("/:pid", productsController.findProductById)

router.post("/", productsController.createProduct)

router.put("/:pid", productsController.updateProduct)

router.delete("/:pid", productsController.deleteProduct)

export default router;