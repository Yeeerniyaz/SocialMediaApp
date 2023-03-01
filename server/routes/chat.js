import express from "express";
import {CreateChat, UserChats, FindChat} from "../conroller/chat.js";
const router = express.Router();

router.post("/", CreateChat);

router.get("/:userId", UserChats);

router.get("/find/:fristId/:secondId", FindChat);

export default router;
