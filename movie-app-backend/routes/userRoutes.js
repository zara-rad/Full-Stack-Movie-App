import { Router } from "express";
import { auth } from "../middlewares/authentication.js";
import { validators } from "../middlewares/users-validator.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getAllUsers,
  getUsersById,
  addNewUser,
  loginUser,
} from "../controllers/userController.js";

import multer from "multer"
const router = Router();
const multerMiddleware =multer()
router.post("/", multerMiddleware.single("profile_image"),validators, addNewUser);
router.get("/", auth, isAdmin, getAllUsers);
router.get("/:id", auth, isAdmin, getUsersById);
router.post("/", validators, addNewUser);
router.post("/login", loginUser); // This maps to loginUser in your controller

export default router;
