import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/realtimeProducts", (req, res) => {
  res.render("realtimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
