import express from "express";
import { sendMessageController } from "../controllers/message/send.controller.js";
import protectRoute from "../middlewares/protect.middleware.js";
import { getMessagesController } from "../controllers/message/get.controller.js";

const router = express.Router();
router.post("/send/:id", protectRoute, sendMessageController);
router.get("/:id", protectRoute, getMessagesController);

export default router;
