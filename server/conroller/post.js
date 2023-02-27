import User from "../models/User.js";
import Post from "../models/Post.js";

export const GetAll = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", " avatarUrl username fristName lastName")
      .populate({
        path: "comments.author",
        select: " avatarUrl username fristName lastName",
      })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Create = async (req, res) => {
  try {
    const tags = req.body.title.split("#");
    const title = tags.shift();

    const doc = new Post({
      title: title,
      tags: tags,
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

    res.json(
      await post.populate("author", " avatarUrl username fristName lastName")
    );
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

export const Like = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    const isLikes = Boolean(post.likes.find(() => req.userId));

    if (!isLikes) {
      await post.likes.push(req.userId);
    } else {
      await post.likes.pull(req.userId);
    }

    post.save();

    return res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const CreateComment = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (Boolean(req.body.text)) {
      const doc = {
        date: Date.now(),
        text: req.body.text,
        author: req.userId,
      };

      await post.comments.push(doc);
      post.save();

      await post.populate({
        path: "comments.author",
        select: " avatarUrl username fristName lastName",
      });

      return res.json(post.comments);
    }

    if (Boolean(req.body.text) === false) {
      return res.status(404).json({ message: "Missing" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const DeleteComment = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    await post.comments.pull({ _id: req.params.id });
    post.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
