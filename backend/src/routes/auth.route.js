import express from "express";
import {
  checkAuthentification,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", login);
router.post("/logout", logout);

router.put("/update", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuthentification);

export default router;
