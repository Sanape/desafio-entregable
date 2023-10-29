import { Router } from 'express';

import {
  addProductToCartById,
  createCart,
  getProductsOfCartById,
} from '../controllers/cartsController.js';
import { body_must_contain_attributes } from '../middlewares/validateBodyRequirements.js';

const router = Router();
router.get('/:cid', getProductsOfCartById);

router.post('/', body_must_contain_attributes(['products']), createCart);

router.post('/:cid/product/:pid', addProductToCartById);

export default router;
