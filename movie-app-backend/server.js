import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import orderRoutes from "./routes/orderRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"


config()
console.clear()

const PORT = 6002
const app = express()

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Movies")
    console.log("Database connected successfully");
} catch (err) {
    console.error("Error connecting to the database:", err.message);
}

//json middleware
app.use(express.json());

//ROUTES
app.use("/orders", orderRoutes); // Order routes
app.use("/movies", movieRoutes); // Movie routes


// Centralized error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: "An unexpected error occurred." });
});


app.listen(PORT, () => console.log("Server is running on port:", PORT))











