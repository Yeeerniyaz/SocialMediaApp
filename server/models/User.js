import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fristName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    username: {
      type: String,
  
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    follows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    avatarUrl: { type: String },
    coverUrl: { type: String },
    social: { type: String },
    location: { type: String },
    status: { type: String },
    profession: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
