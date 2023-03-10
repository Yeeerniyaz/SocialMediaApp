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
      .sort({ likes: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const FollowsPosts = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    const FollowsPosts = await Post.find({ author: { $in: user.follows } })
      .populate("author", " avatarUrl username fristName lastName")
      .populate({
        path: "comments.author",
        select: " avatarUrl username fristName lastName",
      })
      .sort({ createdAt: -1 });

    res.json(FollowsPosts);
  } catch (err) {
    res.json(500).json({ message: "" });
  }
};

export const Create = async (req, res) => {
  try {
    const tags = req.body.title.split("#");
    const title = tags.shift();
    const tag = tags.map((str) => str.trim().toLowerCase());

    const doc = new Post({
      title: title,
      tags: tag,
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
      await post.populate({
        path: "author",
        model: "User",
        select: "avatarUrl username fristName lastName",
      })
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

export const Tags = async (req, res) => {
  try {
    Post.aggregate(
      [
        {
          $unwind: "$tags",
        },
        {
          $group: {
            _id: "$tags",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ],
      (err, result) => {
        res.json(result);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const GetTags = async (req, res) => {
  try {
    const post = await Post.find({ tags: req.params.tags })
      .populate("author", " avatarUrl username fristName lastName")
      .populate({
        path: "comments.author",
        select: " avatarUrl username fristName lastName",
      })
      .sort({ likes: -1 })
      .limit(10);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
