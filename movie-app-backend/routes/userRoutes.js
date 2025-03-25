import express from "express";
import { getAllusers,getUsersById , addNewUser} from "../controllers/userController.js";
const router = express.Router();

router.get("/",getAllusers)
router.get("/:id",getUsersById )
router.post("/",addNewUser)



export default router;

import { validators } from "../middlewares/users-validator.js";
