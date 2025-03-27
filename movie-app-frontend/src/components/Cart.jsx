

import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    console.log("Received cart items:", cartItems);

    try {
      // Call your backend to create a checkout session
      const response = await fetch(
        "http://localhost:6002/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems }), // Pass cartItems for backend to process
        }
      );

      const session = await response.json();
      console.log(session);

      // Redirect to Stripe Checkout page
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-3xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Check Out What You’ve Picked
      </h2>

      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item._id}  // Use _id here to make sure each item is uniquely identified
              className="flex justify-between items-center p-4 mb-4 bg-gray-800 border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-36 object-cover rounded-md"
                />
                <div>
                  <span className="text-lg font-semibold text-white">
                    {item.title} ({item.year})
                  </span>
                  <p className="text-sm text-gray-300">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-300">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}  // Update quantity by 1 when clicked
                      className="bg-gray-500 hover:bg-gray-400 text-white px-2 py-2 rounded-md focus:outline-none"
                      disabled={item.quantity <= 1}  // Disable the button if the quantity is 1
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}  // Update quantity by 1 when clicked
                      className="bg-gray-500 hover:bg-gray-400 text-white px-2 py-2 rounded-md focus:outline-none"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}  // Ensure this is calling the remove function properly
                      className="bg-red-600 hover:bg-red-900 text-white px-2 py-2 rounded-md focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600 text-center">No items in cart.</p>
      )}

      {/* Display Total Price */}
      <div className="text-right mt-4">
        <h3 className="text-xl font-bold text-gray-900">
          Total Price: ${totalPrice.toFixed(2)}
        </h3>
      </div>

      <button
        onClick={handleCheckout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-4"
      >
        Checkout
      </button>
    </div>
  );
}


