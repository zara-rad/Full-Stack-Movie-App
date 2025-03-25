import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cards from "./components/Cards"
import Header from "./components/Header"
import MovieDetails from "./components/MovieDetails"
import Cart from "./components/Cart"
import Register from "./components/Register"
import { useState, useEffect } from "react"
import Login from "./components/Login"
function App() {

  //PART of state to store the current search entered by the user,must be empty
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the cart items
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    // Save the cart items to localStorage to persist them across sessions
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a movie to the cart
  const addToCart = (movie) => {
    if (!cart.some((item) => item.imdbID === movie.imdbID)) {
      setCart([...cart, movie]);
    }
  };

  // Function to remove a movie from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.imdbID !== id));
  };


  return (
    <BrowserRouter>

      <Header setSearchTerm={setSearchTerm} />
      <Routes>


        <Route path="/" element={<Cards searchTerm={searchTerm} addToCart={addToCart} />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
        <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App



