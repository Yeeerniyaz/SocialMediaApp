import { Router } from "express";

import CheckAuth from "../middleware/CheckAuth.js";
import {
  UserFindAll,
  UserFindOne,
  followers,
  follows,
  UserAdd,
  UserDelete,
  FindUserById,
  UsersFind,
} from "../conroller/user.js";

const router = Router();

router.get("/find", CheckAuth, UserFindAll);

router.get("/:id", FindUserById)

router.get("/find/:username", UserFindOne);

router.get("/users/:params", UsersFind);

router.get("/me/flwes", CheckAuth, followers);

router.get("/me/flws", CheckAuth, follows);

router.patch("/i/:id", CheckAuth, UserAdd);

router.patch("/un/:id", CheckAuth, UserDelete);

export default router;
