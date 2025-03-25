/* import { useEffect, useState } from "react";

export default function Cart({ cartItems, removeFromCart }) {
    const [items, setItems] = useState(cartItems);

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li key={item.imdbID} className="flex justify-between items-center p-2 border-b">
                            <span>{item.Title} ({item.Year})</span>
                            <button
                                onClick={() => removeFromCart(item.imdbID)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in cart.</p>
            )}
        </div>
    );
}
 */



//testttttt

import { useEffect, useState } from "react";

export default function Cart({ cartItems, removeFromCart, updateQuantity }) {
    // Using cartItems prop directly—no need for local state if cartItems always reflect the current state
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li
                            key={item.imdbID}
                            className="flex justify-between items-center p-2 border-b"
                        >
                            <div>
                                <span className="font-medium">
                                    {item.Title} ({item.Year})
                                </span>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.imdbID, item.quantity - 1)
                                        }
                                        className="bg-gray-300 px-2 py-1 rounded"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.imdbID, item.quantity + 1)
                                        }
                                        className="bg-gray-300 px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.imdbID)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in cart.</p>
            )}
        </div>
    );
}
