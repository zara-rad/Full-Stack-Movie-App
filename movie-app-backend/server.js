import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { config } from "dotenv"
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"
config()
console.clear()
const PORT = 6002
const app = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Movies")




} catch (err) {
    console.log(err.message)
}

//json middleware
app.use(express.json());






//ROUTES
app.use("/orders", orderRoutes)
/* app.use("/user",userRoutes)
 */



app.listen(PORT, () => console.log("Server is running on port:", PORT))











