import { Router } from "express";
import {
  isAuthenticated,
  isNotAuthenticated,
} from "../middlewares/authenticationMiddleware.js";
import isAdmin from "../middlewares/checkUserRoleMiddleware.js";

const router = Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("home");
});

router.get("/products", isAuthenticated, (req, res) => {
  res.render("products");
});

router.get("/carts/:cid", isAuthenticated, (req, res) => {
  const cartId = req.params.cid;
  res.render("carts", { cartId });
});

router.get("/products/:pid", isAuthenticated, (req, res) => {
  const productId = req.params.pid;
  res.render("product", { productId });
});

router.get("/realtimeProducts", isAuthenticated, isAdmin, (req, res) => {
  res.render("realtimeProducts");
});

router.get("/chat", isAuthenticated, (req, res) => {
  res.render("chat");
});

router.get("/login", isNotAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/register", isNotAuthenticated, (req, res) => {
  res.render("register");
});

router.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile");
});

export default router;
