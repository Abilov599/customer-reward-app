import express from "express";
import {
  authUser,
  loginUser,
  registerUser,
} from "./../controllers/user.js";
const router = express.Router();

router.get("/user", authUser);
router.post("/login", loginUser);
router.post("/signup", registerUser);

export { router as UserRoute };
