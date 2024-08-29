import express from "express";
import { signUpController } from "../controllers/auth/signup.controller.js";
import { loginController } from "../controllers/auth/login.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";

const router = express.Router();

router.post("/login", loginController);

router.post("/signup", signUpController);

router.post("/logout", logoutController);

export default router;
