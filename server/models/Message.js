import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: String },
    senderId: { type: String },
    message: { type: String },
  },
  { timeseries: true }
);

export default mongoose.model("Message", MessageSchema);
