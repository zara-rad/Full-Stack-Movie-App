import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import orderRoutes from "./routes/orderRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"



//import userRoutes from "./routes/userRoutes.js"
//import movieRoutes from "./routes/movieRoutes.js"
//import jwt from "jsonwebtoken"

config()
console.clear()

const PORT = 6002
const app = express()

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Movies")

    console.log("Database connected successfully");

    console.log("DB connected")



} catch (err) {
    console.error("Error connecting to the database:", err.message);
}

//json middleware
app.use(express.json());

//ROUTES

app.use("/orders", orderRoutes); // Order routes
app.use("/movies", movieRoutes); // Movie routes

app.use("/orders", orderRoutes)
//app.use("/users", userRoutes)
//app.use("/movies",movieRoutes)
app.get("/movies", async (req, res, next) => {
    const movies = await MovieModel.find()
    if (movies.lenght > 0) {
        res.send(movies)
    } else {
        const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.VITE_API_KEY}`)
        const movieData = await response.json()
        const updatedMoviesData = movieData.map(movie => ({ ...movie, price: Math.floor(Math.random() * 100) }))
        await MovieModel.create(updatedMoviesData)
        res.send(movieData)
    }

})



// Centralized error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: "An unexpected error occurred." });
});


app.listen(PORT, () => console.log("Server is running on port:", PORT))











