
/* 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards({ searchTerm }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const query = searchTerm || "Marvel";
                const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_API_KEY}`);


                const result = await response.json();

                if (result.Search) {
                    setMovies(result.Search);

                    console.log("Fetched Movies:", result.Search);


                } else {
                    setMovies([]);
                    console.log("No movies found.");
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
                            <Link to={`/movie/${movie.imdbID}`} className="movie-title">
                                {movie.Title}
                            </Link>
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="movie-poster"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentNode.appendChild(document.createElement("p")).innerText =
                                        "Poster not available";
                                }}
                            />
                            <p className="movie-year">Year: {movie.Year}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg font-semibold">No movies found!</p>
            )}
        </div>
    );
} */


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
                const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_API_KEY}`);
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
                            <Link to={`/movie/${movie.imdbID}`} className="movie-title">
                                {movie.Title}
                            </Link>
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="movie-poster"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentNode.appendChild(document.createElement("p")).innerText =
                                        "Poster not available";
                                }}
                            />
                            <p className="movie-year">Year: {movie.Year}</p>
                            <button
                                onClick={() => addToCart(movie)}
                                className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
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












