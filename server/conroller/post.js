import User from "../models/User.js";
import Post from "../models/Post.js";

export const GetAll = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "author",
      " avatarUrl username fristName lastName"
    );

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Create = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      file: req.body.file,
      author: req.userId,
    });

    const post = await doc.save();

    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $push: { posts: post._id },
      }
    );

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Delete = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $pull: { posts: req.params.id },
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
