import MovieModel from "../models/movieSchema.js";

// GET all movies
// Retrieves a list of all movies from the database.
// Returns a JSON response with a success status and the movies data.
export const getAllMovies = async (req, res, next) => {
  try {
    //test
    const { title } = req.query;
    let query = {}
    if (title) {
      query = { title: { $regex: title, $options: "i" } }; // Case-insensitive search
    }
    //till here also add query in find()

    const movies = await MovieModel.find(query);
    res.status(200).json({ success: true, data: movies });
  } catch (err) {
    next(err);
  }
};

// GET single movie
// Retrieves details of a specific movie identified by the given ID.
// If the movie is found, returns a JSON response with the movie data.
// If not found, returns a 404 status with an appropriate message.
// Handles potential CastError if the ID format is invalid.
export const getSingleMovie = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const singleMovie = await MovieModel.findById(req.params.id);

    // Check if the movie was found
    if (!singleMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res.status(200).json({ success: true, data: singleMovie });
  } catch (err) {
    // Handle potential errors such as invalid ObjectId format
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid movie ID format" });
    }
    next(err);
  }
};

// POST new movie
// Creates a new movie record based on the provided request body data.
// Returns a JSON response with a success status and the created movie data.
// Handles validation errors by returning a 400 status with the appropriate message.
export const createNewMovie = async (req, res, next) => {
  try {
    const movie = await MovieModel.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Handle validation errors specifically
      return res.status(400).json({ success: false, message: err.message });
    }
    next(err);
  }
};

// PATCH updating single movie
// Updates the details of an existing movie identified by the given ID
// with the data provided in the request body.
// If the movie is found, returns a JSON response with the updated movie data.
// If not found, returns a 404 status with an appropriate message.
// Handles potential CastError if the ID format is invalid.
export const updateSingleMovie = async (req, res, next) => {
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Check if the movie was found
    if (!updatedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res.status(200).json({ success: true, data: updatedMovie });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid movie ID format" });
    }
    next(err);
  }
};

// DELETE single movie
// Deletes a specific movie from the database identified by the given ID.
// If the movie is found and deleted, returns a success status and a message.
// If not found, returns a 404 status with an appropriate message.
// Handles potential CastError if the ID format is invalid.
export const deleteSingleMovie = async (req, res, next) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(req.params.id);

    // Check if the movie was found and deleted
    if (!deletedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Movie deleted successfully",
        data: deletedMovie,
      });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid movie ID format" });
    }
    next(err);
  }
};
