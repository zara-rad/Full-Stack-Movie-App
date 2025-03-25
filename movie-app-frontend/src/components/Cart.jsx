

import { useEffect, useState } from "react";

export default function Cart({ cartItems, removeFromCart, updateQuantity }) {
    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-3xl mt-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Check Out What You’ve Picked

</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li
                            key={item.imdbID}
                            className="flex justify-between items-center p-4 mb-4 bg-gray-800 border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex gap-4 items-center">
                                <img
                                    src={item.Poster}
                                    alt={item.Title}
                                    className="w-24 h-36 object-cover rounded-md"
                                />
                                <div>
                                    <span className="text-lg font-semibold text-white">
                                        {item.Title} ({item.Year})
                                    </span>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.imdbID, item.quantity - 1)
                                            }
                                            className="bg-gray-500 hover:bg-gray-400 text-white px-2 py-2 rounded-md focus:outline-none"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-semibold text-white">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.imdbID, item.quantity + 1)
                                            }
                                            className="bg-gray-500 hover:bg-gray-400 text-white px-2 py-2 rounded-md focus:outline-none"
                                        >
                                            +
                                        </button>
                                                               <button
                             onClick={() => removeFromCart(item.imdbID)}
                           className="remove-btn"
                                >
                                 Remove
                           </button>
                                    </div>
                                </div>
                            </div>
     

                            <button >Checkout</button>
                            
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg text-gray-600 text-center">No items in cart.</p>
            )}
        </div>
    );
}
