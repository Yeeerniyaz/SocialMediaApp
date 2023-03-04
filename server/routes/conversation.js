import express from "express";
import Conversation from "../models/Conversation.js";

import CheckAuth from "../middleware/CheckAuth.js";

const router = express.Router();

router.post("", CheckAuth, async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.userId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", CheckAuth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.userId] },
    });

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
