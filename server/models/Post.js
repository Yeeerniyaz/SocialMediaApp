import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    file: {
      type: String,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        text: {
          type: String,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
