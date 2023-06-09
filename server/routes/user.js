import express from "express";
import {
  authUser,
  loginUser,
  registerUser,
  userLogout,
} from "./../controllers/user.js";
const router = express.Router();

router.get("/user", authUser);
router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/logout", userLogout);

export { router as UserRoute };
