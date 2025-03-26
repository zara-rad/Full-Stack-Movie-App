import { Router } from "express";
import {
  createNewOrder,
  deleteSingleOrder,
  getAllOrders,
  getSingleOrder,
  updateSingleOrder,
} from "../controllers/orderController.js";
import { auth } from "../middlewares/authentication.js";

const router = Router();
router.get("/", auth, getAllOrders);
router.get("/:id", getSingleOrder);
router.post("/", createNewOrder);
router.patch("/:id", auth, updateSingleOrder);
router.delete("/:id", auth, deleteSingleOrder);
export default router;
