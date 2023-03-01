import mongoose from "mongoose";

const ChatShema =  mongoose.Schema(
  {
    membres: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", ChatShema);
