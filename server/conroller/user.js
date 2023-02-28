import User from "../models/User.js";

export const UserFindAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UserFindOne = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("posts")
      .populate({
        path: "posts.author",
        select: " avatarUrl username fristName lastName",
      })
      .populate({
        path: "posts.comments.author",
        select: " avatarUrl username fristName lastName",
      });
    user.password = null;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const followers = async (req, res) => {
  const user = await User.findOne({ _id: req.userId }).populate(
    "followers",
    "fristName lastName avatarUrl username "
  );
  res.json(user.followers);
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const follows = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UserAdd = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $push: { follows: req.params.id },
      }
    );
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { followers: req.userId },
      }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UserDelete = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $pull: { follows: req.params.id },
      }
    );

    await User.findOneAndUpdate(
      { _id: req.params.id },

      {
        $pull: { followers: req.userId },
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
