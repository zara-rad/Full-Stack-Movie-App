import { Router } from "express";
import { auth } from "../middlewares/authentication.js";
import { validators } from "../middlewares/users-validator.js";
import {
  getAllusers,
  getUsersById,
  addNewUser,
  loginUser,
} from "../controllers/userController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router();

router.get("/", auth, isAdmin, getAllusers);
router.get("/:id", auth, isAdmin, getUsersById);
router.post("/", validators, addNewUser);
router.post("/login", loginUser); // This maps to loginUser in your controller

export default router;
