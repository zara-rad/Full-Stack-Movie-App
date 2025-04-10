import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./components/Cards.jsx";
import Header from "./components/Header.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Cart from "./components/Cart.jsx";
import Register from "./components/Register.jsx"; // import the Register component
import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  const addToCart = (movie) => {
    if (!cart.some((item) => item._id === movie._id)) {
      setCart([...cart, { ...movie, quantity: 1 }]); // Add movie with initial quantity of 1
    } else {
      alert("This movie is already in your cart!");
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative quantity
    setCart(
      cart.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <BrowserRouter>
      <Header setSearchTerm={setSearchTerm} cartItems={cart} />{" "}
      {/* Pass cartItems to Header */}
      <Routes>
        <Route
          path="/"
          element={<Cards searchTerm={searchTerm} addToCart={addToCart} />}
        />
        <Route
          path="/movie/:imdbID"
          element={<MovieDetails addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/register" element={<Register />} />{" "}
        {/* Add Register route */}
        <Route path="/login" element={<Login />} /> {/* Add Register route */}
        <Route path="/admin" element={<AdminPanel />} /> {/* Add AdminPanel */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
