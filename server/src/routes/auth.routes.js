import express from "express";
import { register, login, getProfile } from "../modules/auth/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.post("/register", userUpload.single("image"), registerUser);
export default router;
