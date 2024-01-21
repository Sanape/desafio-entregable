import express from "express";

import {
  deleteCurrentUser,
  updateCurrentUser,
  forgotPassword,
  resetPassword
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
  multerUploads,
  processImage,
} from "../middlewares/uploadImages.middleware.js";

import { body_must_not_contain_attributes, meetsWithEmailRequirements, meetsWithPasswordRequirements } from "../middlewares/validationData.middleware.js";

const router = express.Router();

router.delete("/", isAuthenticated, deleteCurrentUser);//route:✓ anda:✓

router.put(//route:✓ anda:✓
  "/",
  isAuthenticated,
  body_must_not_contain_attributes(["id", "email", "password", "oauthuser", "role"]),
  multerUploads,
  processImage,
  updateCurrentUser
);

router.post(//route:✓ anda:✓
  "/forgotPassword",
  meetsWithEmailRequirements,
  forgotPassword
);

router.post(//route:✓ anda:✓
  "/resetPassword/:token",
  meetsWithPasswordRequirements,
  resetPassword
);

export default router;
