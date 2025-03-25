import { Router } from "express";
import { createNewOrder, deleteSingleOrder, getAllOrders, getSingleOrder, updateSingleOrder } from "../controllers/orderController.js";







const router = Router()
router.get("/", getAllOrders)
router.get("/:id", getSingleOrder)
router.post("/", createNewOrder)
router.patch("/:id", updateSingleOrder)
router.delete("/:id", deleteSingleOrder)
export default router;
