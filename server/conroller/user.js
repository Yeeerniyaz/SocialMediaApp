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
    const user = await User.findOne({ username: req.params.username });
    user.password = null;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const followers = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    const followers = user.followers;

    res.json(followers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const follows = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    const follows = user.follows;
    res.json(follows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UserAdd = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const candidate = await User.findById(req.params.id);

    console.log(user + candidate);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UserDelete = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { id: req.params.id },
      {
        $pull: { follows: req.userId },
      }
    );
    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $pull: { followers: req.params.id },
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
