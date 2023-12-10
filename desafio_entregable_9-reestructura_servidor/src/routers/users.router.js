import { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';

const router = Router();

router.post("/signup", usersController.userSignup)

router.get("/logout", usersController.userLogout)

export default router;