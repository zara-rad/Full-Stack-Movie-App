import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
export default function MovieDetails({ addToCart }) {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!imdbID) return;
    setLoading(true);
    fetch(`http://localhost:6002/movies/${imdbID}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setMovie(result.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching movie details:", err);
      });
  }, [imdbID]);
  useEffect(() => {
    if (!movie || !movie.genre) return;
    const genre = movie.genre.split(", ")[0]; // Get the first genre
    fetch(`http://localhost:6002/movies`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const filteredMovies = result.data.filter((m) => m.genre === movie.genre);
          setSuggestedMovies(filteredMovies.slice(0, 6)); // Limit to 6 movies
          console.log(filteredMovies)
        }
      })
      .catch((err) => console.error("Error fetching suggestions:", err));
  }, [movie]);
  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie details not found!</p>;
  return (
    <div style={{ padding: "16px" }}>
      <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>{movie.title}</h1>
        <img
          src={movie.image}
          alt={movie.title}
          style={{ width: "100%", maxWidth: "300px", height: "auto", borderRadius: "8px", marginBottom: "16px" }}
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Plot:</strong> {movie.plot}</p>
        <p><strong>Actors:</strong> {movie.actors}</p>
        <p><strong>Price:</strong> {movie.price}</p>
        <button
          onClick={() => addToCart(movie)}
          style={{
            backgroundColor: "#FFCC00",
            color: "white",
            padding: "8px 16px",
            marginTop: "16px",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
            fontSize: "16px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#FFCC00")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FFCC00")}
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
                to={`/movie/${movie._id}`}
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
                  src={movie.image}
                  alt={movie.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "6px" }}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <p style={{ fontSize: "14px", fontWeight: "bold", marginTop: "8px", color: "white" }}>{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}









