import express from "express";

import {
  deleteUser,
  updateCurrentUser
} from "../controllers/userController.js";

import { isAuthenticated } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.delete("/", deleteUser);

router.put("/", isAuthenticated, updateCurrentUser);

export default router;
