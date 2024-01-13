import express from "express";

import passport from "passport";

import {
  body_must_contain_attributes,
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
} from "../middlewares/validationData.middleware.js";

import {
  getActualUser,
  login,
  logout,
  register,
} from "../controllers/session.controller.js";

import "../middlewares/google.strategy.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  //route:✓ anda:✓
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  //route:✓ anda:✓
  "/google/callback",
  passport.authenticate("google", {

    failureRedirect: "http://localhost:8080/login",
  })
  ,(req, res, next)=>{
    res.cookie("user", JSON.stringify(req.user))
    res.redirect("http://localhost:8080")
  }
);

router.post(
  //route:✓ anda:✓
  "/login",
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  login
);

router.post(
  //route:✓ anda:✓
  "/register",
  body_must_contain_attributes(["first_name", "last_name"]),
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  register
);

router.delete("/", isAuthenticated, logout); //route:✓

router.get("/current", isAuthenticated, getActualUser); //route:✓ anda:✓

export default router;
