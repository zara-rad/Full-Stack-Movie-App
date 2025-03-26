
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function MovieDetails({ addToCart }) {
  const { imdbID } = useParams(); // Extract the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  //const {user}=useContext()

  useEffect(() => {
    if (!imdbID) return;
    setLoading(true);
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY}`)
/*     fetch(`http://localhost:6002/movies/${imdbID}`)
 */      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result)
        setMovie(result); // Store movie details
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching movie details:", err);
      });
  }, [imdbID]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }
  if (!movie) {
    return <p>Movie details not found!</p>;
  }



  return (
    <div className="card-container p-6">
      <div className="movie-details">
        <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="mb-4"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.appendChild(
              document.createElement("p")
            ).innerText = "Poster is not available";
          }}
        />
        <p>
          <strong>Year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <p>
          <strong>Prise:</strong> {movie.Price}
        </p>
        <button
          onClick={() => addToCart(movie)}
          className="bg-blue-500 text-white px-3 py-1 mt-4 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        {/*  {user?.role === "admin" && <>
          <button>Delete Movie</button>
          <button>Update Movies</button>
        </>} */}
      </div>
    </div>
  );
}






