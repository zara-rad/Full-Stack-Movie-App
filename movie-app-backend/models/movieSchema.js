import { Schema, model } from "mongoose";

// Define the schema for the Movie model
const movieSchema = new Schema({
  title: { type: String, required: true }, // The title of the movie, required field
  image: { type: String }, // URL or path to the movie's poster image
  year: { type: Number }, // Release year of the movie
  genre: { type: String }, // Genre of the movie (e.g., Action, Comedy)
  director: { type: String }, // Director of the movie
  plot: { type: String }, // Brief description or storyline of the movie
  actors: { type: [String] }, // List of actors in the movie
  price: { type: Number }, // Price of the movie (could represent rental or purchase price)
});

// Create the Movie model using the defined schema
const MovieModel = model("Movie", movieSchema);

// Export the Movie model for use in other parts of the application
export default MovieModel;
