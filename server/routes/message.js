import express from "express";
import CheckAuth from "../middleware/CheckAuth.js";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/", CheckAuth, async (req, res) => {
  try {
    const newMessage = new Message({
      conversationId: req.body.conversationId,
      sender: req.userId,
      text: req.body.text,
    });
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
