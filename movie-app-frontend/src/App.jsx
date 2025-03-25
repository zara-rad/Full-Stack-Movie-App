import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./components/Cards.jsx";
import Header from "./components/Header.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Cart from "./components/Cart.jsx";
import Register from "./components/Register.jsx"; // import the Register component
import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 /*  const addToCart = (movie) => {
    if (!cart.some((item) => item.imdbID === movie.imdbID)) {
      setCart([...cart, movie]);
    }
  };
 */

  const addToCart = (movie) => {
   alert("Item successfully added")    // Check if the movie is already in the cart
    if (!cart.some((item) => item.imdbID === movie.imdbID)) {
        setCart([...cart, { ...movie, quantity: 1 }]); // Add movie with initial quantity of 1
    } else {
        alert("This movie is already in your cart!");
    }
};

const updateQuantity = (id, quantity) => {
  if (quantity < 1) return; // Prevent negative quantity
  setCart(cart.map((item) => 
    item.imdbID === id ? { ...item, quantity } : item
  ));
};
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.imdbID !== id));
  };

  

  return (
    <BrowserRouter>
      <Header setSearchTerm={setSearchTerm} cartItems={cart} /> {/* Pass cartItems to Header */}
      <Routes>
        <Route path="/" element={<Cards searchTerm={searchTerm} addToCart={addToCart} />} />
        <Route path="/movie/:imdbID" element={<MovieDetails addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={<Cart cartItems={cart} removeFromCart={removeFromCart}             updateQuantity={updateQuantity} 
          />} 
        />
        <Route path="/register" element={<Register />} /> {/* Add Register route */}
        <Route path="/login" element={<Login/>} /> {/* Add Register route */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
