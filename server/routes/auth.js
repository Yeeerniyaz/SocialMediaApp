import { Router } from "express";
import CheckAuth from "../middleware/CheckAuth.js";
import {
  Register,
  Login,
  GetMe,
  Update,
  UpdatePassword,
} from "../conroller/auth.js";

const router = Router();

router.post("/register", Register);

router.post("/login", Login);

router.patch("/update", CheckAuth, Update);

router.patch("/password", CheckAuth, UpdatePassword);

router.get("", CheckAuth, GetMe);

export default router;
