import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllusers, deleteUser, updateUser } from "../controllers/adminController.js";

const router = express.Router();

// Fetch all users (Only Admin)
router.get("/users", auth, isAdmin, getAllusers);

// Update a user role (Only Admin)
router.patch("/users/:id", auth, isAdmin, updateUser);

// Delete a user (Only Admin)
router.delete("/users/:id", auth, isAdmin, deleteUser);

export default router;