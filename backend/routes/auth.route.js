import express from "express";
import { getMe, login, logout, signup, forgot, setpass } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
//when we hit /signup control go to backend/controller/auth.controller.js
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot", forgot);//for forgot pass
router.post("/setpass", setpass);

export default router;
