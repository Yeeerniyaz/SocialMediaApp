import { Router } from "express";

import {
  GetAll,
  Create,
  Delete,
  Like,
  Tags,
  CreateComment,
  DeleteComment,
  GetTags,
} from "../conroller/post.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = Router();

router.get("/", GetAll);

router.post("/", CheckAuth, Create);

router.delete("/:id", CheckAuth, Delete);

router.get("/like/:id", CheckAuth, Like);

router.get("/tags", Tags);

router.get("/:tags", GetTags);

router.post("/comment/:id", CheckAuth, CreateComment);

router.delete("/comment/:postId/:id", CheckAuth, DeleteComment);

export default router;
