import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";
import PostRoutes from "./routes/post.js";
import FileRoutes from "./routes/file.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));

app.use("/files", express.static("files"));
app.use("/send", FileRoutes);
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/post", PostRoutes);

app.listen(process.env.PORT, (err) => {
  err ? console.error(err) : console.log("Local port is " + process.env.PORT);
});
