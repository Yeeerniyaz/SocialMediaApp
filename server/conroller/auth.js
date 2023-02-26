import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const Register = async (req, res) => {
  try {
    const isUnique = await User.findOne({ email: req.body.email });

    if (isUnique) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    let username = req.body.email.split("@")[0];
    const isValidUserName = await User.findOne({
      username: req.body.email.split("@")[0],
    });

    if (isValidUserName) {
      username = Date.now();
    }

    const doc = new User({
      fristName: req.body.fristName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: username,
      password: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const username = req.body.email.split("@")[0];
    const user = await User.findOne({ username: username }).populate("posts");
    if (!user) {
      return res
        .status(403)
        .json({ message: "Incorrect username or password" });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res
        .status(403)
        .json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.password = undefined;

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const GetMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("posts");
    if (!user) {
      return res.status(404).json({ message: "No access" });
    }

    user.password = undefined;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Update = async (req, res) => {
  try {
    const username = await User.findOne({ username: req.params.username });

    if (username) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        fristName: req.body.fristName,
        lastName: req.body.lastName,
        location: req.body.location,
        social: req.body.social,
        status: req.body.status,
        avatarUrl: req.body.avatarUrl,
        coverUrl: req.body.coverUrl,
        profession: req.body.profession,
      }
    );

    user.password = undefined;

    res.json(user.populate("posts"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UpdatePassword = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        password: hash,
      }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
