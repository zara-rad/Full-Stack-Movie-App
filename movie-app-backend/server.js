import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import { auth } from "./middlewares/authentication.js";
import Stripe from "stripe";
import ImageModel from "./models/imageSchema.js";


config();
console.clear();

const PORT = 6002;
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true, exposedHeaders: ["token"] }));

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/Movies");

  console.log("Database connected successfully");
} catch (err) {
  console.error("Error connecting to the database:", err.message);
}

//json middleware
app.use(express.json());

//ROUTES
app.use("/user", userRoutes);
app.use("/orders", auth, orderRoutes); // Order routes
app.use("/movies", movieRoutes); // Movie routes

app.get("/movies", async (req, res, next) => {
  const movies = await MovieModel.find();
  if (movies.length > 0) {
    res.send(movies);
  } else {
    const response = await fetch(
      //`http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.VITE_API_KEY}`
    );
    const movieData = await response.json();
    const updatedMoviesData = movieData.map((movie) => ({
      ...movie,
      price: Math.floor(Math.random() * 100),
    }));
    await MovieModel.create(updatedMoviesData);
    res.send(movieData);
  }
});

/* app.get("/images/:filename", async (req, res, next) => {
  try {
    const image = await ImageModel.findOne({ filename: req.params.filename })
    if (image) {
      const readStream = Readable.from(image.data);
      readStream.pipe(res);
    } else {
      next("no such image found!");
    }

  } catch (err) {
    next(err)
  }


}) */











app.post("/create-checkout-session", async (req, res) => {

  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const line_items = cartItems.map((item) => {
      if (!item.price || isNaN(Number(item.price))) {
        throw new Error(`Invalid price for item: ${item.title}`);
      }

      return {
        price_data: {
          currency: "usd", // Change this if needed
          product_data: {
            name: item.title, // Ensure this field exists
            description: item.year ? `Released in ${item.year}` : "Movie item",
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(Number(item.price) * 100), // Convert price to cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?payment=cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send({ success: false, message: "An unexpected error occurred." });
});

app.listen(PORT, () => console.log("Server is running on port:", PORT));
