import express from "express";
import protectRoute from "../middlewares/protect.middleware.js";
import { getUsersController } from "../controllers/user/get.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersController);

export default router;
