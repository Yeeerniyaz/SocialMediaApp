import Chat from "../models/Chat.js";

export const CreateChat = async (req, res) => {
  try {
    const newChat = new Chat({
      membres: [req.body.senderId, req.body.receiverId],
    });
    const result = await newChat.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UserChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      membres: { $in: [req.params.userId] },
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const FindChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      membres: { $all: [req.params.fristId, req.params.secondId] },
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
