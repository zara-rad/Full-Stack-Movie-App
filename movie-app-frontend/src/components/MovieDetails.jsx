
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
    /* fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY}`)
 */   fetch(`http://localhost:6002/movies/${imdbID}`)
       .then((res) => res.json())
    //fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY}`)
   fetch(`http://localhost:6002/movies/${imdbID}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result)
        setMovie(result.data); // Store movie details
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
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <img
          src={movie.image}
          alt={movie.title}
          className="mb-4"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.appendChild(
              document.createElement("p")
            ).innerText = "Poster is not available";
          }}
        />
        <p>
          <strong>Year:</strong> {movie.year}
        </p>
        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.director}
        </p>
        <p>
          <strong>Plot:</strong> {movie.plot}
        </p>
        <p>
          <strong>Actors:</strong> {movie.actors}
        </p>
        <p>
          <strong>Price:</strong> {movie.price}

          <strong>Prise:</strong> {movie.price}
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
 
/* import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails({ addToCart }) {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imdbID) return;
    setLoading(true);

    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setMovie(result);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching movie details:", err);
      });
  }, [imdbID]);

  useEffect(() => {
    if (!movie || !movie.Genre) return;

    const genre = movie.Genre.split(", ")[0]; // Get the first genre
    fetch(`https://www.omdbapi.com/?s=${genre}&apikey=${import.meta.env.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          const filteredMovies = data.Search.filter((m) => m.imdbID !== imdbID);
          setSuggestedMovies(filteredMovies.slice(0, 6)); // Limit to 6 movies
        }
      })
      .catch((err) => console.error("Error fetching suggestions:", err));
  }, [movie]);

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie details not found!</p>;

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>{movie.Title}</h1>
        <img
          src={movie.Poster}
          alt={movie.Title}
          style={{ width: "100%", maxWidth: "300px", height: "auto", borderRadius: "8px", marginBottom: "16px" }}
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Price:</strong> {movie.Price}</p>
        <button
          onClick={() => addToCart(movie)}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            marginTop: "16px",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
            fontSize: "16px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          Add to Cart
        </button>
      </div>

      {suggestedMovies.length > 0 && (
        <div style={{ marginTop: "20px", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "white" }}>
            You Might Also Like
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {suggestedMovies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                style={{
                  backgroundColor: "#444",
                  padding: "8px",
                  borderRadius: "8px",
                  width: "130px",
                  textAlign: "center",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "6px" }}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <p style={{ fontSize: "14px", fontWeight: "bold", marginTop: "8px", color: "white" }}>{movie.Title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 */







