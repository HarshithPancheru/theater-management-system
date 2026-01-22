import express from "express";
import { register, login, getProfile, resetPassword, forgotPassword } from "../modules/auth/auth.controller.js";
import {userUpload} from "../middleware/upload.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.post("/register", userUpload.single("image"), register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
