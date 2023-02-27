import jwt from "jsonwebtoken";

const CheckAuth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No access" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode._id;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default CheckAuth;
