import express from "express";

import passport from "passport";

import {
  body_must_contain_attributes,
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
} from "../middlewares/validateBodyRequirements.js";

import {
  logout,
  register,
  getActualUser,
} from "../controllers/sessionController.js";

import "../middlewares/passportLocal.js";
import "../middlewares/passportGithub.js";

import { isAuthenticated } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:8080/login",
  }),
  (req, res, next) => {
    res.redirect("http://localhost:8080/products?oauth=true");
  }
);

router.post(
  "/login",
  meetsWithEmailRequirements,
  body_must_contain_attributes(["password"]),
  passport.authenticate("local", {
    failureRedirect: "http://localhost:8080/login",
  }),
  (req, res, next) => {
    res.status(200).send({ message: req.user });
  }
);

router.post(
  "/register",
  body_must_contain_attributes([
    "first_name",
    "last_name",
    "email",
    "age",
    "password",
  ]),
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  register
);

router.delete("/", logout);

router.get("/current", isAuthenticated, getActualUser);

export default router;
