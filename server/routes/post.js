import { Router } from "express";

import { GetAll, Create, Delete } from "../conroller/post.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = Router();

router.get("/", GetAll);

router.post("/", CheckAuth, Create);

router.delete("/:id", CheckAuth, Delete);

export default router;
