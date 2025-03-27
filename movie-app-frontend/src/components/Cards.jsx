/* import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards({ searchTerm, addToCart }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:6002/movies");
        const result = await response.json();

        if (result.success) {
          setMovies(result.data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <Link to={`/movie/${movie._id}`} className="movie-title">
                {movie.title}
              </Link>
              <img
                src={movie.image}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.appendChild(
                    document.createElement("p")
                  ).innerText = "Poster not available";
                }}
              />
              <p className="movie-year">Year: {movie.year}</p>
              <button
                onClick={() => {
                  addToCart(movie); // Ensure addToCart function is being called correctly
                  console.log("Adding movie to cart:", movie);
                }}
                className="bg-blue-500 text-white px-3 py-1 mt-2 rounded w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold">No movies found!</p>
      )}
    </div>
  );
}
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards({ searchTerm, addToCart }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:6002/movies");
        const result = await response.json();

        if (result.success) {
          setMovies(result.data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              {/* Wrap the entire movie card in a Link */}
              <Link to={`/movie/${movie._id}`} className="block">
                <h3 className="movie-title text-lg font-semibold">{movie.title}</h3>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.appendChild(
                      document.createElement("p")
                    ).innerText = "Poster not available";
                  }}
                />
                <p className="movie-year">Year: {movie.year}</p>
                <p className="movie-price">Price: {movie.price}</p>

              </Link>
              <button
                onClick={() => {
                  addToCart(movie); // Ensure addToCart function is being called correctly
                  console.log("Adding movie to cart:", movie);
                }}
                className="bg-blue-500 text-white px-3 py-1 mt-2 rounded w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold">No movies found!</p>
      )}
    </div>
  );
}
