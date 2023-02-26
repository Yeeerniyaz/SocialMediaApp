import { Router } from "express";

import {
  GetAll,
  Create,
  Delete,
  Like,
  CreateComment,
  DeleteComment,
} from "../conroller/post.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = Router();

router.get("/", GetAll);

router.post("/", CheckAuth, Create);

router.delete("/:id", CheckAuth, Delete);

router.get("/like/:id", CheckAuth, Like);

router.post("/comment/:id", CheckAuth, CreateComment);

router.get("/comment/:postId/:id", CheckAuth, DeleteComment);

export default router;
