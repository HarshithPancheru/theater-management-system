import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "Get users placeholder" });
});

router.patch("/:userId/status", (req, res) => {
  res.json({ success: true, message: "Update user status placeholder" });
});

export default router;
