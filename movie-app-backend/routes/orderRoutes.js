import { Router } from "express";
import {
  createNewOrder,
  deleteSingleOrder,
  getAllOrders,
  getSingleOrder,
  updateSingleOrder,
} from "../controllers/orderController.js";
import { auth } from "../middlewares/authentication.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();
router.get("/", auth, isAdmin, getAllOrders);
router.get("/:id", auth, getSingleOrder);
router.post("/", createNewOrder);
router.patch("/:id", auth, isAdmin, updateSingleOrder);
router.delete("/:id", auth, isAdmin, deleteSingleOrder);
export default router;
