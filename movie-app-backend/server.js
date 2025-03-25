import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import orderRoutes from "./routes/orderRoutes.js"
config()
console.clear()
const PORT = 6002
const app = express()
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Movies")




} catch (err) {
    console.log(err.message)
}

//json middleware
app.use(express.json());






//ROUTES
app.use("/orders", orderRoutes)




app.listen(PORT, () => console.log("Server is running on port:", PORT))











