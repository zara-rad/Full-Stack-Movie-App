import { Router } from "express";
import {
  createNewMovie,
  deleteSingleMovie,
  getAllMovies,
  getSingleMovie,
  updateSingleMovie,
} from "../controllers/movieController.js";

const router = Router();

// Routes for managing movies
// GET all movies: Retrieves a list of all movies in the database.
router.get("/", getAllMovies);

// GET single movie: Retrieves details of a specific movie by its ID.
router.get("/:id", getSingleMovie);

// POST new movie: Creates a new movie record based on the request body.
router.post("/", createNewMovie);

// PATCH update single movie: Updates the details of a specific movie by its ID.
router.patch("/:id", updateSingleMovie);

// DELETE single movie: Removes a specific movie from the database by its ID.
router.delete("/:id", deleteSingleMovie);

export default router;
