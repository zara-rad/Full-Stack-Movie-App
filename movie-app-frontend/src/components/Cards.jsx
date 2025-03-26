
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards({ searchTerm, addToCart }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const query = searchTerm || "Marvel";
        const response = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_API_KEY
          }`
        );
        const result = await response.json();

        if (result.Search) {
          setMovies(result.Search);
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
              {/* Wrap the whole card inside Link */}
              <Link to={`/movie/${movie.imdbID}`} className="block">
                <p className="movie-title text-lg font-semibold cursor-pointer text-center">
                  {movie.Title}
                </p>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="movie-poster cursor-pointer"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.appendChild(
                      document.createElement("p")
                    ).innerText = "Poster not available";
                  }}
                />
              </Link>
              <p className="movie-year text-center">Year: {movie.Year}</p>
              <button
                onClick={() => {
                  console.log("Adding movie to cart:", movie);
                  addToCart(movie);
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

