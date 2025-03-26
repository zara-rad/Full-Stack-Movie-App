import { Router } from "express";
import { auth } from "../middlewares/authentication.js";
import { validators } from "../middlewares/users-validator.js";
import {
  getAllusers,
  getUsersById,
  addNewUser,
  loginUser,
} from "../controllers/userController.js";
import multer from "multer"
import {validators} from "../middlewares/users-validator.js"

const router = Router();

router.get("/", auth, getAllusers);
router.get("/:id", auth, getUsersById);
router.post("/",validators, addNewUser);
router.post("/", multerMiddleware.single("profile_image"),validators, createNewUser);
router.post("/login", loginUser); // This maps to loginUser in your controller

export default router;
