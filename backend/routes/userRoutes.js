import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/loguot", logoutUser);
router.post("/follow", followUnfollowUser);

export default router;
