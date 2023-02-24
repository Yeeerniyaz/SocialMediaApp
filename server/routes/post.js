import { Router } from "express";

import { GetAll, Create, Delete , Like} from "../conroller/post.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = Router();

router.get("/", GetAll);

router.post("/", CheckAuth, Create);

router.delete("/:id", CheckAuth, Delete);

router.get("/like/:id", CheckAuth, Like)

export default router;
