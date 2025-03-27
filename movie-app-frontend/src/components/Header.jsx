/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

export default function Header({ setSearchTerm, cartItems }) {
  const location = useLocation(); // Get the current route

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value.trim();
    if (query) setSearchTerm(query);
    e.target.elements.searchInput.value = "";
  };

  const handleHomeClick = () => {
    setSearchTerm(""); // Reset search when clicking home
  };

  // Hide the search bar if the current path is for movie details, register, login, or cart page
  const isMovieDetailPage = location.pathname.includes("/movie/");
  const isRegisterPage = location.pathname === "/register";
  const isCartPage = location.pathname === "/cart";
  const isLoginPage = location.pathname === "/login";

  return (
    <header className="header">
      <nav>
        <Link to="/" onClick={handleHomeClick}>
          Home
        </Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/cart" className="cart-link">
          <span role="img" aria-label="cart">
            🛒
          </span>
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </Link>
      </nav>

      {!isMovieDetailPage && !isRegisterPage && !isCartPage && !isLoginPage && (
        <form className="search-form" onSubmit={handleSearch}>
          <h1>Movie Search</h1>
          <p>Find your favorite movies!</p>
          <input
            type="text"
            name="searchInput"
            placeholder="Search your movie..."
          />
          <button type="submit">Search</button>
        </form>
      )}
    </header>
  );
}
