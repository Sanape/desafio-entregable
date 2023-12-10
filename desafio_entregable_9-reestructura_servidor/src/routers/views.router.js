import { Router } from 'express';
import { viewsController } from '../controllers/views.controller.js';

const router = Router();

router.get("/", viewsController.loginRender)

router.get("/signup", viewsController.signupRender)

router.get("/loginerror", viewsController.loginErrorRender)

router.get("/registererror", viewsController.registerErrorRender)

router.get("/products", viewsController.productsRender)

router.get("/carts/:cid", viewsController.populatedCartRender)

router.get("/products/:pid", viewsController.productDetailsRender)

export default router;