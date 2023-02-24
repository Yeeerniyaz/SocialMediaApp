import { Router } from "express";

import CheckAuth from "../middleware/CheckAuth.js";
import {
  UserFindAll,
  UserFindOne,
  followers,
  follows,
  UserAdd,
  UserDelete,
} from "../conroller/user.js";

const router = Router();

router.get("", UserFindAll);

router.get("/:username", UserFindOne);

router.get("/followers", CheckAuth, followers);

router.get("/follows", CheckAuth, follows);

router.patch("/:username", CheckAuth, UserAdd);

router.delete("/:username", CheckAuth, UserDelete);

export default router;
