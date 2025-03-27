import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import { auth } from "./middlewares/authentication.js";
import Stripe from "stripe";


config();
console.clear();

const PORT = 6002;
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true,exposedHeaders:["token"]}));

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
// Stripe Checkout Session Route
app.post("/create-checkout-session", async (req, res) => {
    try {
      const { cartItems } = req.body;
  console.log(cartItems)
        // Ensure the price is valid and in cents (multiply by 100)
        const line_items = cartItems.map((item) => {
            const priceInCents = Math.round(parseFloat(item.price) * 100); // Convert to cents and ensure it is a number
            if (isNaN(priceInCents) || priceInCents <= 0) {
                throw new Error(`Invalid price for item: ${item.Title}`);
              }
      
            return {
              price_data: {
                currency: "usd", // Adjust to your currency if necessary
                product_data: {
                  name: item.title,
                },
                unit_amount: priceInCents, // Must be an integer
              },
              quantity: item.quantity,
            };
          });
  
      // Create the checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success`,  // Customize success URL
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,   // Customize cancel URL
      });
  
      // Send back the session ID
      res.json({ id: session.id });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      res.status(500).send("Internal Server Error");
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
