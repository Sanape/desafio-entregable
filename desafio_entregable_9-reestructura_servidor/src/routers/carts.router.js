import { Router } from 'express';
import { cartsController } from '../controllers/carts.controller.js';

const router = Router();

router.get("/", cartsController.findAllCarts)

router.get("/:cid", cartsController.findCartAndPopulate)

router.post("/", cartsController.createNewCart)

router.put("/:cid", cartsController.addProductToCart)

router.delete("/:cid", cartsController.emptyCart)

router.put("/:cid/products/:pid", cartsController.updateProductQuantity)

router.delete("/:cid/products/:pid", cartsController.deleteOneProduct)

export default router;